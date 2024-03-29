import dynamic from "next/dynamic";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useAppSelector } from "@/store";
import { ProfileProps } from "../../../typings";
import UploadAvatar from "./UploadAvatar";
import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
const EditProfile = dynamic(() => import("./EditProfile"));

function Profile({ setIsOpen }: ProfileProps) {
  const profile = useAppSelector((state) => state.profileSlice.profile);
  if (!profile) {
    return <>login</>;
  }
  return (
    <motion.div
      {...FADE_IN_ANIMATION_SETTINGS}
      className="fixed right-0 w-screen sm:w-[480px] h-full flex flex-col gap-2 rounded-2xl shadow-xl border border-[#343A40] bg-dark9 z-50 overflow-hidden"
    >
      <div className="w-full h-[120px] rounded-sm pr-2 pt-2 profileFade">
        <button
          className=" rounded-full h-7 w-7 bg-dark7 text-cyan5 inline-flex items-center justify-center absolute top-3 right-3 border border-solid hover:bg-cyan5 hover:text-black duration-300 transition-all"
          aria-label="Close"
          onClick={() => setIsOpen(false)}
        >
          <Cross2Icon />
        </button>
      </div>
      <div className="relative w-full">
        <div className="absolute -top-12 left-[40px] rounded-full w-[100px] h-[100px] bg-dark flex items-center justify-center overflow-hidden">
          {profile.avatarPath ? (
            <div className="relative w-full h-full pb-[56.25%]">
              <img
                className="absolute inset-0 w-full h-full object-cover object-center "
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user-avatars/${profile.avatarPath}`}
                alt="avatar"
              />
            </div>
          ) : (
            <Image
              src="/assets/userIcon.svg"
              alt="avatar"
              width={100}
              height={100}
            />
          )}
        </div>
        <div className="absolute top-0.5 left-[164px] flex flex-col gap-3 w-fit">
          <h2 className="whitespace-nowrap">{profile?.userName}</h2>
          <p className="whitespace-nowrap">ID: {profile?.id}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-14">
        <div className="flex gap-6 mt-8 justify-evenly w-full">
          <EditProfile />
          <UploadAvatar />
        </div>
        {/* <div className="flex flex-col gap-[16px] mt-10 justify-center items-center">
					<h2 className="font-bold text-lg text-dark2">Your tasks</h2>
					{haveTasks ? (
						<div className="flex items-center justify-center flex-col">
							<Search
								value={searchInput}
								setValue={setSearchInput}
								classes="w-[400px]"
							/>
							<AccordionDemo />
						</div>
					) : (
						<p className="text-sm text-dark2 font-normal">
							У вас нет назначенных задач
						</p>
					)}
				</div> */}
      </div>
    </motion.div>
  );
}

export default Profile;
