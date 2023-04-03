import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useAppDispatch, useAppSelector } from '@/store';
import supabase from '@/lib/supabaseClient';
import { IProfile, setProfile } from '@/store/slices/profileSlice';
import { useRouter } from 'next/router';

function EditProfile() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const profile = useAppSelector(state => state.profileSlice.profile)
    const [userName, setuserName] = useState('')
    const [password, setPassword] = useState('')

    async function updateName(userId: string | undefined, userName: string): Promise<void> {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ userName })
                .eq('id', userId);

            if (error) {
                throw error;
            }
        } catch (err) {
            console.error('Ошибка при обновлении профиля:', err);
        }
    }

    async function handleUpdateProfile() {
        if (!profile) return;
        const newData = {
            id: profile.id,
            avatar: profile.avatar,
            email: profile.email,
            userName
        }
        const { data, error } = await supabase.auth.updateUser({
            email: profile.email,
            password,
        })
        await updateName(data.user?.id, userName)
        await dispatch(setProfile(newData))
        setuserName('')
        setPassword('')
        router.push('/')
        if (error) {
            throw error;
        }
    }

    return (
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<button className="bg-dark6 py-[10px] px-[22px] font-semibold text-base text-white rounded-lg">
						Редактировать
					</button>
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
					<Dialog.Content className=" border borser-solid border-dark4 z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-dark9 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
						<Dialog.Title className="text-white mb-5 text-xl font-normal">
							Редактирование
						</Dialog.Title>
						<div className="flex flex-col gap-3">
							<fieldset className="mb-[15px] flex items-center  gap-5 ">
								<label
									className="text-gray6 w-[45px] font-semibold text-sm"
									htmlFor="username"
								>
									Имя
								</label>
								<input
									className="block h-[36px] w-full items-center justify-center rounded-[4px] px-[10px] text-[15px]"
									type="text"
									value={userName}
									onChange={(e) => setuserName(e.target.value)}
								/>
							</fieldset>
							<fieldset className="mb-[15px] flex items-center gap-5">
								<label
									className="text-gray6 w-11 font-semibold text-sm"
									htmlFor="username"
								>
									Пароль
								</label>
								<input
									className="block h-[36px] w-full  items-center justify-center rounded-[4px] px-[10px] text-[15px]"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</fieldset>
						</div>

						<div className="mt-[25px] flex justify-end">
							<Dialog.Close asChild>
								<button
									className="bg-dark6 text-white text-base font-semibold inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
									onClick={handleUpdateProfile}
								>
									Save changes
								</button>
							</Dialog.Close>
						</div>
						<Dialog.Close asChild>
							<button
								className="text-white hover:bg-dark4 absolute top-[23px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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

export default EditProfile;