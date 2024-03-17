export class Profile {
    id: string | null = null;
    firstname: string | null = null;
    lastname: string | null = null;
    bio: string | null = null;
    imageData: FormData | null = null;
    imageUrl: string | null = null
    email: string | null = null;

    constructor(){
        this.imageData = null;
    }
}