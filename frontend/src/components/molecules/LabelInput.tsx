import "./LabelInput.css";

type LabelInputFieldProps = {
    labelText:string;
    inputType: string;
    placeHolder: string;
    value:string;
    fnOnChange:(newValue:string)=>void;
}

export default function LabelInput({labelText, inputType, placeHolder,  value, fnOnChange}:LabelInputFieldProps) {
    return (
        <div className="labelInput-container">
            < label className="field-label" > {labelText} </label >
            <input className="field-input" type={inputType} placeholder= {placeHolder}
                value={value}
                onChange={(evento)=>fnOnChange(evento.target.value)}
            />
        </div>
    )
}