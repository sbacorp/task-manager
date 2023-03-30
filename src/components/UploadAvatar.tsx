import { useRef, useEffect, useState } from 'react';
import Image from 'next/link'
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import supabase, {storage} from '@/lib/supabaseClient';
import { useAppDispatch, useAppSelector } from '@/store';
import { setProfile } from '@/store/slices/profileSlice';

function UploadAvatar() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const profile = useAppSelector(state => state.profileSlice.profile)
    const dispatch = useAppDispatch();

  async function saveAvatarPath(userId: string, avatarPath: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ avatarPath })
        .eq('id', userId);
        dispatch(
					setProfile({
						id: profile!.id,
						userName: profile!.userName,
						email: profile!.email,
						avatar: avatarPath,
					})
				);
      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Ошибка при сохранении аватара:', err);
    }
  }

  const uploadAvatar = async (userId: string, file: File): Promise<string | null> => {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${userId}.${fileExtension}`;
    const filePath = `avatars/${userId}/${fileName}`;
    const { error } = await supabase.storage
			.from("user-avatars")
			.upload(filePath, file, { cacheControl: "3600", upsert: true });
  if (error) {
    console.error('Ошибка обновлении файла: ', error.message);
    return null;
  }

  return filePath;
}

const handleFileSubmit = async () => {
    if (!profile) return;
  
    const file = fileInputRef.current?.files?.[0];
    console.log(file);
    
    if (!file) return;
  
    const userId = profile.id as string;
    const avatarPath = await uploadAvatar(userId, file);
  
    if (avatarPath) {
      console.log('Profile photo uploaded successfully:', avatarPath);
      await saveAvatarPath(userId, avatarPath);
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
					<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-dark9 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50 border border-solid">
						<Dialog.Title className="text-white mb-5 text-xl font-normal">
							Загрузите фото
						</Dialog.Title>
						<div className="flex flex-col gap-3 ">
							<input
								type="file"
								name="avatar"
								ref={fileInputRef}
								accept="image/*"
								className="text-white"
							/>
						</div>

						<div className="mt-[25px] flex justify-end">
							<Dialog.Close asChild>
								<button
									className="bg-dark6 text-white text-base font-semibold inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
									onClick={handleFileSubmit}
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


export default UploadAvatar