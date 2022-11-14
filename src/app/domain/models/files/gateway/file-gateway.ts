import { Observable } from "rxjs";
import { IFileResponse } from "../IFile";

export abstract class FileGateway {
  abstract saveFile(
    formData: FormData,
    user_id: string,
    guest_user: boolean,
    recaptcha: string
  ): Observable<IFileResponse>;
}
