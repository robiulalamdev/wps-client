/* eslint-disable react/prop-types */
import { Button, Dialog } from "@material-tailwind/react";

import { SpinnerCircularFixed } from "spinners-react";
import { useCreateCollectionMutation } from "../../redux/features/collections/collectionsApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const MediaCenterCreateCollectionModal = ({ open, close }) => {
  const { handleSubmit, register, reset } = useForm();
  const [createCollection, { isLoading }] = useCreateCollectionMutation();

  const handleCreateNewCollection = async (data) => {
    const options = {
      data: data,
    };
    const result = await createCollection(options);
    // console.log(result);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      reset();
      close(false);
    } else {
      toast.error(result?.data?.message);
    }
  };
  return (
    <Dialog open={open} handler={() => close(false)} size="xs">
      <form
        onSubmit={handleSubmit(handleCreateNewCollection)}
        className="max-w-[300px] w-full mx-auto bg-white h-fit px-3 py-5 rounded-md max-h-[300px]"
      >
        <div className="mb-4">
          <span className="block text-black text-base font-bakbak-one mb-1">
            Collection Name
          </span>
          <input
            {...register("name", { required: true })}
            type="text"
            className="w-full h-10 bg-gray-100 border border-gray-300 outline-none px-2 rounded text-sm font-bakbak-one"
            placeholder="Enter Collection Name"
            required
          />
        </div>

        <div className="mt-1">
          <Button
            type="submit"
            disabled={isLoading}
            className="font-normal normal-case bg-[#2924FF] w-[129px] h-[38px] rounded-[5px] mx-auto  hover:shadow-none shadow-none font-bakbak-one text-[15px] text-[#C4C4C4] inline-block p-0 leading-normal flex justify-center items-center gap-2"
          >
            {isLoading && (
              <SpinnerCircularFixed
                size={20}
                thickness={180}
                speed={300}
                color="rgba(255, 255, 255, 1)"
                secondaryColor="rgba(255, 255, 255, 0.42)"
              />
            )}{" "}
            Create
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default MediaCenterCreateCollectionModal;
