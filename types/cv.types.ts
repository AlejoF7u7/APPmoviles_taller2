export interface PersonalInfo {
    fullName : string;
    email : string;
    phone :string;
    location : string;
    summary : string;
    photoUri : string; // uri local de la foto (cámara o galería), "" si no hay
}

// Las fechas se guardan como texto ISO "YYYY-MM-DD"
export interface Experience {
    id : string;
    company : string;
    position :string;
    startDate : string;
    endDate : string; // "" cuando current es true
    current : boolean;
    description : string;
}

export interface Education {
    id : string;
    institution : string;
    degree :string;
    field : string;
    graduationDate : string; // "" si no se indicó
}

export type SkillType = "soft" | "hard";

export interface Skill {
    id : string;
    name : string;
    type : SkillType; // soft = blanda, hard = dura/técnica
}

export interface CVData {
   personalInfo: PersonalInfo;
   experiences: Experience[];
   education : Education[];
   skills : Skill[];
}
