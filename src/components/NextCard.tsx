
import { Card, CardBody, CardHeader, User } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function Reviews() {
  const [data, setData] = useState<Reviewer[]>([]);
  const [text, setText] = useState<string[]>([]);
  
  async function getData(){
    await fetch(
      "https://randomuser.me/api/?results=8&inc=name,email,id,picture", 
    )
    .then((res) => res.json())
    .then((res) => setData(res.results))
    .catch((err) => console.error(err));
  };

  async function getText() {
    await fetch('https://loripsum.net/api/8/short')
    .then((res) => res.json())
    .then((res) => {

      setText(res.data.split('\n'))
    })
    .catch((err) => console.error(err));
  }

  useEffect(() => {
    getData();
    getText();
  }, []);
  
  return(
    <div>
      {data.map((review, index) => 
        <NextCard key={review.id.value} reviewer={review} header={reviewTitles[index % 8]} index={index} />
      )}
    </div>
  )
}


function NextCard({reviewer, header, index} : NextCardProps) {

  return (
    <Card className="p-2">
      <CardHeader className="flex justify-between">
        <User className=""
         name={`${reviewer.name.first} ${reviewer.name.last.charAt(0).toUpperCase()}.`} 
        avatarProps={{src: reviewer.picture.thumbnail}}
        />
        <p className="text-sm font-semibold uppercase">{header}</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div>{text[index]}</div>
      </CardBody>
    </Card>
  );
}


interface NextCardProps {
  reviewer: Reviewer;
  header: string;
  index: number;
}

type Reviewer = {
  id: {name: string, value: string},
  name: {title: string, first: string, last: string},
  email: string,
  picture: {large: string, medium: string, thumbnail: string}
}

const reviewTitles = [
  'Great Service!', 'I will always come here', 'Quick and Fast!', 'Low Prices!'
];