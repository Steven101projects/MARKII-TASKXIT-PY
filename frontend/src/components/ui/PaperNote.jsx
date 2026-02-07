




export default function PaperNote({width, height, className, text}){
    
    return(
        <div
        className={`${width ? width : "w-72"} ${height ? height : "h-90"}
        ${className}
        border-[#ffbd59] border-2 rounded-2xl bg-white`}>
<div>
Nico
</div>
        </div>
    )
}