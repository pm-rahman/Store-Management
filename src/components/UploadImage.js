import { ImagePlus, Loader } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import React from "react";
import { useToast } from "./ui/use-toast";

export default function UploadImage({ label, image, setImage }) {
  const toast = useToast();
  console.log("image:", image);
  const [isLoading, setIsLoading] = React.useState(false);
  const onChange = (e) => {
    setIsLoading(true);
    try {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage({ name: file.name, url: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.log("error from uploading error:", error);
      toast({
        description: "Something went wrong!",
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="relative h-10">
      {!isLoading ? (
        <ImagePlus className="absolute top-3 left-3 size-[16px] stroke-gray-500" />
      ) : (
        <Loader className="animate-spin absolute top-3 left-3 size-[16px] stroke-gray-500" />
      )}
      <div className="pl-10 cursor-pointer h-10 flex items-center rounded border">
        {!isLoading ? (
          !image?.url ? (
            <Label
              className="font-light text-gray-600 inline-block w-full"
              htmlFor="image-upload"
            >
              {label || "Upload Image"}
            </Label>
          ) : (
            <Label htmlFor='image-upload' className=" text-gray-800 inline-block w-full">
              {image?.name}
            </Label>
          )
        ) : (
          <div className="flex items-center gap-1 font-light text-300 text-[14px]">
            Uploading...
          </div>
        )}
      </div>
      <Input
        type="file"
        id="image-upload"
        onChange={onChange}
        className={
          "hidden bg-transparent placeholder:text-muted-foreground focus:shadow-sm ring-offset-0 text-[14px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        }
      />
    </div>
  );
}
