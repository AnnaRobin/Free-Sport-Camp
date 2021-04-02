export default class ErrorHelper{

    public static async readResponse(response:any):Promise<any>
    {
        if(response.status !== 400){
            return response.json();
        }
        const datas = await response.json();
        
        if(Array.isArray(datas)){
            switch(datas[0].code){
                case "UniqueMail":
                    throw new Error("Ce mail est déjà utilisé");
                case "UniqueName":
                    throw new Error("Nom d'utilisateur est déjà pris");
                default:
                    throw new Error("Erreur inconnue");
            }
        }
        return response.json();
    }
}