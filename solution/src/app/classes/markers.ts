import { MarkerImage } from "./marker-image.enum";

export class Markers
{
    constructor(public Points: Array<Array<number>>, public Image: MarkerImage){}
}