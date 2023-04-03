import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { useRouter } from 'next/router';
import supabase from '@/lib/supabaseClient';
import {
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { setProfile } from '@/store/slices/profileSlice';
import ForgetPassword from './ForgetPassword';

function EditProfile() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const profile = useAppSelector(
    (state) => state.profileSlice.profile
  );
  const [userName, setUserName] = useState('');
  const [newPassword, setNewPassword] =
    useState('');
  const [currentPassword, setCurrentPassword] =
    useState('');
  const [message, setMessage] = useState('');

  async function handleUpdateName() {
    if (!profile) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ userName })
        .eq('id', profile.id);
      dispatch(
        setProfile({ ...profile, userName })
      );
      setUserName('');
      router.push('/');
      if (error) {
        throw error;
      }
    } catch (err) {
      console.error(
        'Ошибка при обновлении профиля:',
        err
      );
    }
  }

  async function handleUpdatePassword() {
    if (!profile) return;
    const { error: checkError } =
      await supabase.auth.signInWithPassword({
        email: profile?.email,
        password: currentPassword,
      });
    if (checkError) {
      console.error(
        'Ошибка при проверке текущего пароля:',
        checkError
      );
      setMessage('Неправильный текущий пароль');
      return;
    }

    const { data, error: updateError } =
      await supabase.auth.updateUser({
        email: profile.email,
        password: newPassword,
      });
    if (updateError) {
      console.log(
        'Ошибка при обновлении пароля:',
        updateError
      );
      return;
    }
    setMessage(
      'Ваш пароль успешно изменен. Можете закрыть диалоговое окно'
    );
    setCurrentPassword('');
    setNewPassword('');
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-dark6 py-[10px] px-[22px] font-semibold text-base text-white rounded-lg">
          Редактировать
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          onCloseAutoFocus={() => {
            setUserName('');
            setCurrentPassword('');
            setNewPassword('');
            setMessage('');
          }}
          onEscapeKeyDown={() => {
            setUserName('');
            setCurrentPassword('');
            setNewPassword('');
            setMessage('');
          }}
          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[305px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-dark9 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none flex items-center justify-center z-50"
        >
          <Tabs.Root
            className="flex flex-col w-[300px] "
            defaultValue="tab1"
          >
            <Tabs.List
              className="shrink-0 flex border-b border-solid border-dark"
              aria-label="Manage your account"
            >
              <Tabs.Trigger
                className="bg-dark9 h-[45px] flex-1 flex items-center justify-center text-lg text-white select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:border-white border-solid data-[state=active]:border-b-2 data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-white outline-none cursor-default"
                value="tab1"
              >
                Профиль
              </Tabs.Trigger>
              <Tabs.Trigger
                className="bg-dark9 h-[45px] flex-1 flex items-center justify-center text-lg text-white select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:border-white border-solid data-[state=active]:border-b-2 data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-white outline-none cursor-default"
                value="tab2"
              >
                Пароль
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              className="grow p-5 bg-dark9 rounded-b-md outline-none "
              value="tab1"
            >
              <p className="mb-5 text-white text-base">
                Внесите изменения в свое имя
                профиля. Нажмите сохранить, когда
                закончите.
              </p>
              <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                <label
                  className=" text-sm mb-2.5 text-white block"
                  htmlFor="username"
                >
                  Имя профиля
                </label>
                <input
                  className="grow shrink-0 rounded px-2.5 text-[15px] text-black h-[35px] outline-none"
                  id="username"
                  value={userName}
                  onChange={(e) =>
                    setUserName(e.target.value)
                  }
                />
              </fieldset>
              <div className="flex justify-center mt-5">
                <Dialog.Close asChild>
                  <button
                    onClick={handleUpdateName}
                    disabled={!userName}
                    className="inline-flex bg-cyan6 hover:bg-cyan9 disabled:bg-cyan4 items-center border border-white border-solid justify-center rounded px-[15px] text-base font-medium h-[35px] text-white"
                  >
                    Сохранить изменения
                  </button>
                </Dialog.Close>
              </div>
            </Tabs.Content>
            <Tabs.Content
              className="grow p-5 bg-dark9 rounded-b-md outline-none"
              value="tab2"
            >
              <p className="mb-5 text-white text-base leading-normal">
                Измените свой пароль здесь.
              </p>
              <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                <label
                  className="text-sm leading-none mb-2.5 text-white block"
                  htmlFor="currentPassword"
                >
                  Текущий пароль
                </label>
                <input
                  className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-black h-[35px]  outline-none"
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                />
              </fieldset>
              <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                <label
                  className="text-sm leading-none mb-2.5 text-white block"
                  htmlFor="newPassword"
                >
                  Новый пароль
                </label>
                <input
                  className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-black h-[35px] outline-none"
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                />
                {message && (
                  <p
                    className={`text-xs ${
                      message.length === 27
                        ? 'text-red6'
                        : 'text-green9'
                    } font-semibold tracking-wide flex items-center gap-2 mt-3`}
                  >
                    <span className="italic font-titleFont text-2xl font-extrabold">
                      !
                    </span>{' '}
                    {message}
                  </p>
                )}
              </fieldset>
              <div className="flex justify-center mt-5 flex-col items-center gap-3">
                <button
                  onClick={handleUpdatePassword}
                  disabled={
                    !newPassword ||
                    !currentPassword
                  }
                  className="bg-cyan6 hover:bg-cyan9 disabled:bg-cyan4 inline-flex items-center justify-center rounded px-[15px] text-base leading-none font-medium h-[35px] border border-white border-solid text-white  outline-none"
                >
                  Изменить пароль
                </button>
                <Dialog.Close asChild>
                  <ForgetPassword />
                </Dialog.Close>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default EditProfile;
