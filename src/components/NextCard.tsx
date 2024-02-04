import { Card, CardBody, CardHeader, User } from "@nextui-org/react";
import Reviewer from "./Reviewer";
import { useEffect, useState } from "react";


export default function NextCard({ header }: { header: string }) {
    const [text, setText] = useState<string>('');

    async function getRandomText(){
        const respone = await fetch("https://loripsum.net/api/1/short");
        const data = await respone.text();
        console.log(data);
        
        setText(data);
    }
    useEffect(()=>{
        getRandomText();
    },[])

  return (
    <Card className="px-4 py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-row items-start align-middle">
        <Reviewer name="Jane Doe" />
        <p className="text-tiny uppercase font-bold">{header}</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <p>{text}</p>
      </CardBody>
    </Card>
  );
}