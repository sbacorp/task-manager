import { useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import supabase, {
  storage,
} from '@/lib/supabaseClient';
import {
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { setProfile } from '@/store/slices/profileSlice';

function UploadAvatar() {
  const fileInputRef =
    useRef<HTMLInputElement | null>(null);
  const profile = useAppSelector(
    (state) => state.profileSlice.profile
  );
  const dispatch = useAppDispatch();
  const [message, setMessage] =
    useState<string>('');

  async function saveAvatarPath(
    userId: string,
    avatarPath: string
  ): Promise<void> {
    if (!profile) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ avatarPath })
        .eq('id', userId);
      dispatch(
        setProfile({
          id: profile.id,
          userName: profile.userName,
          email: profile.email,
          avatar: avatarPath,
        })
      );
      if (error) {
        throw error;
      }
    } catch (err) {
      console.error(
        'Ошибка при сохранении аватара:',
        err
      );
    }
  }

  const uploadAvatar = async (
    userId: string,
    file: File
  ): Promise<string | null> => {
    const fileExtension = file.name
      .split('.')
      .pop();
    const fileName = `${userId}.${fileExtension}`;
    const filePath = `avatars/${userId}/${fileName}`;
    const { error } = await supabase.storage
      .from('user-avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });
    if (error) {
      console.error(
        'Ошибка обновлении файла: ',
        error.message
      );
      return null;
    }

    return filePath;
  };

  const handleFileSubmit = async () => {
    if (!profile) return;

    const file = fileInputRef.current?.files?.[0];

    if (!file) return;

    const userId = profile.id as string;
    const avatarPath = await uploadAvatar(
      userId,
      file
    );

    if (avatarPath) {
      console.log(
        'Profile photo uploaded successfully:',
        avatarPath
      );
      await saveAvatarPath(userId, avatarPath);
      setMessage('');
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-dark6 py-[10px] px-[22px] font-semibold text-base text-white rounded-lg">
          Изменить аватар
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          onCloseAutoFocus={() => {
            setMessage('');
          }}
          onEscapeKeyDown={() => {
            setMessage('');
          }}
          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[80vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-dark9 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50 border border-solid"
        >
          <Dialog.Title className="text-white mb-5 text-xl font-normal">
            Загрузите фото
          </Dialog.Title>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="upload-photo"
              className="relative block w-fit"
            >
              <input
                type="file"
                name="avatar"
                ref={fileInputRef}
                accept="image/*"
                id="upload-photo"
                className="absolute -z-10 opacity-0 hidden w-0 h-0"
                onChange={(e) =>
                  setMessage(
                    e.target.value.substring(12)
                  )
                }
              />
              <span className="inline-block cursor-pointer font-semibold outline-none text-sm text-white text-center border-4 bg-cyan7 rounded py-[10px] px-[20px] hover:bg-cyan9">
                Выберите файл
              </span>
            </label>
            {message && (
              <p className="p-3 text-white bg-black rounded-sm border-2 border-white mb-4">
                {`Выбран файл: ${message}`}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Dialog.Close asChild>
              <button
                disabled={!message}
                className="bg-dark6 disabled:bg-dark3 text-white text-base font-semibold inline-flex h-[35px] items-center justify-center hover:bg-dark5 rounded-[4px] px-[15px] leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                onClick={handleFileSubmit}
              >
                Обновить
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-white hover:bg-dark4 absolute top-[23px] right-[19px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default UploadAvatar;
