import { BasicFolder } from "./basic-folder";
import { CurrentFolder } from "./current-folder";
import { File } from "./file";

export class Folder extends BasicFolder{
    parentFolder: BasicFolder;
    files: File[];
    folders: Folder[];
}
