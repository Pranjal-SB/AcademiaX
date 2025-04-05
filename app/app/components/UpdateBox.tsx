import { useUser } from "@/lib/zustand";
import { X } from "lucide-react";

const UpdateBox = () => {
  return (
    <div className="fixed w-screen h-screen z-50 items-center justify-center flex bg-black/50 top-0 left-0">
      <div className="mx-4 w-[500px] h-[350px] bg-background rounded-lg shadow-foreground/10 p-5 border border-foreground/10">
        <div className="flex items-center justify-between">
          <p className="text-2xl  font-semibold">Updates v1.2.0 🥳</p>
          <X
            onClick={() => useUser.setState({ NewVersion: false })}
            className="cursor-pointer p-0.5 border border-foreground/10 rounded "
            size={30}
          />
        </div>
        <div className="flex flex-col gap-2 mt-5 ">
          <div className="flex gap-4 items-center px-2 ">
            <div className="w-4 md:w-3 h-2 bg-green-500 rounded-full " />
            <p>
              Migrating the application, including the backend, to Cloudflare
              infrastructure to enhance performance and reliability.
            </p>
          </div>
        </div>

        <div className="w-full justify-center flex mt-[30px]">
          <a
            href="https://chat.whatsapp.com/B6a15jYEKgI1UD7QzX39cM"
            className="bg-green-600/80 text-white px-4 py-2 mt-5 rounded-md hover:bg-green-600 duration-300 transition-all hover:scale-98"
          >
            Join What&apos;sapp Group
          </a>
        </div>
      </div>
    </div>
  );
};

export default UpdateBox;
