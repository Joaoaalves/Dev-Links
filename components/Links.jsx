"use client"
import { useState } from "react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import Image from "next/image"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
    
import { useProfile } from "@/hooks/useProfile"

const res = await fetch("http://localhost:3000/platforms.json")
const platforms = await res.json()

export default function Links(){
    const {links, addLink, swapLinksPosition } = useProfile()

    const onDragEnd = ({source, destination}) => {
        swapLinksPosition(source.index, destination.index)
    }

    return (
            <div className="w-full flex flex-col items-start">
                <h1 className="mb-2 text-[32px] font-bold">Customize your links</h1>
                <p className="mb-10">Add/edit/remove links below and then share all your profiles with the world!</p>
                <NewLinkButton onClick={addLink}>
                    + Add new link
                </NewLinkButton>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="w-full space-y-6">
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            >
                            {links.map((link, index) => (
                                <Draggable key={link.id} draggableId={link.id} index={index}>
                                {(provided) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    >
                                        <Link link={link} index={index + 1} key={`link-${link.id}`}/> 
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
                {
                    links && links.lenght > 0 && <button className="p-2 bg-primary text-white rounded-lg ms-auto">Save</button>
                }
            </div>
    )
}

function NewLinkButton({onClick}){
    return (
        <button onClick={onClick} className="w-full border-primary border-2 rounded-lg text-primary p-2 mb-6">+ Add new link</button>
    )
}

function Link({link, index}){
    const [isOpen, setIsOpen] = useState(true)


    const {removeLink} = useProfile()

    return (
            <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2 cursor-grab active:cursor-grabbing p-[20px]"
            >
            <div className="flex items-center justify-between space-x-4">
                <CollapsibleTrigger asChild>
                    <div className="flex gap-x-2 items-center cursor-pointer">
                        <Image src="/images/icon-drag-and-drop.svg" width={12} height={6} />
                        <h4 className="font-bold text-borders">{link.platform ? link.platform : `Link #${index}`}</h4>
                    </div>
                </CollapsibleTrigger>
                <button onClick={() => removeLink(link.id)} className="text-borders hover:text-red transition-all duration-300">
                    Remove
                </button>

            </div>
            <CollapsibleContent className="flex flex-col items-start justify-between gap-y-[12px] w-full">
                <LinkSelect link={link}  />
                <LinkInput link={link}/>
            </CollapsibleContent>
            </Collapsible>
    )
}

function LinkSelect({link}){
    const {handleLinkChange} = useProfile()

    const onValueChange = (value) => {
        handleLinkChange(
            link.id, 
            "platform",
            value
        )
    }

    return (
        <div className="flex flex-col items-start gap-y-2 w-full">
            <label className="text-sm font-semibold text-dark-gray">Platform</label>
            <Select onValueChange={(value) => onValueChange(value)} id="" className="w-full" value={link.platform}>
                <SelectTrigger className="w-full h-14 text-[1em] text-dark-gray rounded-lg !border-light-gray">
                    <SelectValue placeholder="Platform" className=""/>
                </SelectTrigger>
                <SelectContent >
                {platforms && platforms.map((platform, index) => (
                    <SelectItem value={platform.value} key={`platform-${index}`} className="cursor-pointer hover:bg-[#d3d3d3] !border-light-gray" >
                        <div className="flex items-center gap-x-4  w-full p-2">
                            <Image src={platform.icon} alt={`Icon`} width={16} height={16} />
                            {platform.name}
                        </div>
                    </SelectItem> 
                ))}
                </SelectContent>

            </Select>
        </div>
    )
}

function LinkInput({link}){
    const {handleLinkChange} = useProfile()

    const onChange = (value) => {
        handleLinkChange(link.id, 'url', value)
    }
    return (
        <div className="w-full">
            <label htmlFor="">Link</label>
            <div className="flex items-center gap-x-4 w-full h-14 p-5 border-[1px] border-light-gray rounded-lg">
                <Image src={"/images/icon-link.svg"} alt={"Icon"} width={16} height={16} />
                <input onChange={(e) => onChange(e.target.value)} type="text" name="Link" id="" value={link.url} className="border-0 w-full ring-0 outline-none"/>
            </div>
        </div>
    )
}