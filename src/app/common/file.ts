import { BasicFolder } from "./basic-folder";

export class File {
    id: string;
    displayName: string;
    extension: string;
    parentFolder: BasicFolder;
    fileType: string;
}
