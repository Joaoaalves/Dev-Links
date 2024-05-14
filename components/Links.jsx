"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useProfile } from "@/hooks/useProfile";
import { usePlatforms } from "@/hooks/usePlatforms";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

import { toast } from "sonner";

export default function Links() {
  const { links, addLink, swapLinksPosition } = useProfile();

  const onDragEnd = ({ source, destination }) => {
    swapLinksPosition(source.index, destination.index);
  };

  const handleSaveLinks = async () => {
    const saveLinks = async () => {
      const emptyLinkExists = links.some(link => !link.platform || !link.url);

      if(emptyLinkExists)
        return toast("Please remove or complete all empty links before submitting.", {
          position: "bottom-center",
          style: {
            backgroundColor: "#FF3939",
            color: "white",
            textAlign: "center",
          },
      });

      await fetch("/api/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          links,
        }),
      }).then((res) => {
        if (res.error) console.log(res.error);
        else
          toast("Your changes have been successfully saved!", {
            position: "bottom-center",
            style: {
              backgroundColor: "#333333",
              color: "white",
              textAlign: "center",
            },
          });
      });
    };
    saveLinks();
  };

  return (
    <div className="w-full h-full flex flex-col items-start bg-white rounded-xl p-6 md:p-10">
      <h1 className="mb-2 text-2xl md:text-[32px] font-bold">Customize your links</h1>
      <p className="mb-10 text-borders text-[16px]">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <NewLinkButton onClick={addLink}>+ Add new link</NewLinkButton>
      {links && links.length > 0 && <ScrollArea className="w-full whitespace-nowrap rounded-md pe-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="w-full">
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {links.map((link, index) => (
                    <Draggable
                      key={link._id}
                      draggableId={link._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Link
                            link={link}
                            index={index + 1}
                            key={`link-${link.id}`}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
        <ScrollBar orientation="vertical" />
      </ScrollArea>}
      {links.length === 0 && <GetStarted />}
      {links.length > 0 && (
        <button
          onClick={handleSaveLinks}
          className="p-2 w-full md:w-36 bg-primary text-white rounded-lg ms-auto me-4 mt-auto hover:bg-secondary hover:scale-105 transition-all duration-150"
        >
          Save
        </button>
      )}
    </div>
  );
}

function NewLinkButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full border-primary border-2 rounded-lg text-primary p-2 mb-6 hover:text-white hover:bg-primary transition-all duration-300"
    >
      + Add new link
    </button>
  );
}

function Link({ link, index }) {
  const [isOpen, setIsOpen] = useState(true);
  const { removeLink } = useProfile();
  const { getPlatform } = usePlatforms();

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2 cursor-grab active:cursor-grabbing p-[20px] bg-background my-6 rounded-lg"
    >
      <div className="flex items-center justify-between space-x-4">
        <CollapsibleTrigger asChild>
          <div className="flex gap-x-2 items-center cursor-pointer">
            <Image src="/images/icon-drag-and-drop.svg" width={12} height={6} alt="Drag and drop icon."/>
            <h4 className="font-bold text-borders">
              {link?.platform
                ? getPlatform(link.platform).name
                : `Link #${index}`}
            </h4>
          </div>
        </CollapsibleTrigger>
        <button
          onClick={() => removeLink(link._id)}
          className="text-borders hover:text-red transition-all duration-300"
        >
          Remove
        </button>
      </div>
      <CollapsibleContent className="flex flex-col items-start justify-between gap-y-[12px] w-full">
        <LinkSelect link={link} />
        <LinkInput link={link} />
      </CollapsibleContent>
    </Collapsible>
  );
}

function GetStarted(){
  return (
    <div className="bg-background flex flex-col items-center justify-center w-full h-full px-8">
      <Image src={'/images/illustration-empty.svg'} width={250} height={160} alt="Image of a hand touching a table screen."/>
      <h1 className="text-[32px] font-bold text-center text-dark-gray">Let’s get you started</h1>
      <p className="text-[16px] text-borders text-center max-w-96">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
    </div>
  )
}

function LinkSelect({ link }) {
  const { handleLinkChange } = useProfile();
  const { platforms } = usePlatforms();

  const onValueChange = (value) => {
    handleLinkChange(link._id, "platform", value);
  };

  return (
    <div className="flex flex-col items-start gap-y-2 w-full">
      <label className="text-sm font-semibold text-dark-gray">Platform</label>
      <Select
        onValueChange={onValueChange}
        id=""
        className="w-full"
        value={link.platform}
      >
        <SelectTrigger className="w-full h-14 text-[1em] text-dark-gray rounded-lg !border-light-gray">
          <SelectValue placeholder="Platform" className="" />
        </SelectTrigger>
        <SelectContent>
          {platforms &&
            platforms.map((platform) => (
              <SelectItem
                value={platform._id}
                key={`platform-${platform._id}`}
                className="cursor-pointer hover:bg-[#d3d3d3] !border-light-gray"
              >
                <div className="flex items-center gap-x-4  w-full p-2">
                  <Image
                    src={platform.icon}
                    alt={`Icon of ${platform.name}`}
                    width={16}
                    height={16}
                    style={{
                      filter: "saturate(1) brightness(1) invert(1)",
                    }}
                  />
                  {platform.name}
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function LinkInput({ link }) {
  const { handleLinkChange } = useProfile();
  const [validLink, setValidLink] = useState(false);

  const { validateUrl } = usePlatforms();

  const onChange = (value) => {
    handleLinkChange(link._id, "url", value);
  };

  useEffect(() => {
    if (link.platform && link.url)
      setValidLink(validateUrl(link.platform, link.url));
  }, [link]);

  return (
    <div className="flex flex-col items-start gap-y-2 w-full">
      <label className="text-sm font-semibold text-dark-gray">Link</label>
      <div
        className="grid grid-cols-[2em_1fr] sm:grid-cols-[2em_1fr_10em] grid-rows-1 items-center place-items-center max-w-[90vw] border-[1px] rounded p-3 gap-x-2 w-full"
        style={{
          borderColor: validLink ? "" : "red",
        }}
      >
        <Image
          src={"/images/icon-link.svg"}
          alt={"Icon of link"}
          width={16}
          height={16}
        />
        <input
          onChange={(e) => onChange(e.target.value)}
          type="text"
          name="Link"
          id=""
          value={link.url}
          className="border-0 w-full ring-0 outline-none"
        />
        {!validLink && (
          <span className="hidden sm:block !text-red ms-auto me-3 text-[10px]">
            Invalid Link
          </span>
        )}
      </div>
    </div>
  );
}
