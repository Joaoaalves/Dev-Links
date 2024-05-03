export default function Button({children, onClick}){
    return (
        <button onClick={onClick} className="w-full p-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition-all duration-150 hover:shadow-[0px_0px_32px_0px_rgba(96,60,255,0.25)]">{children}</button>
    )
}