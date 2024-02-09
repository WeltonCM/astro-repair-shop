
import { Card, CardBody, CardHeader, User } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function Reviews() {
  const [data, setData] = useState<Reviewer[]>([]);
  
  async function getData(){
    await fetch(
      "https://dummyjson.com/users?limit=5&select=id,firstName,lastName,age,image"
    )
    .then((res) => res.json())
    .then((res) => setData(res.users))
    .catch((err) => console.error(err));
  }

  useEffect(() => {
    getData();
  }, []);
  
  return(
    <div>
      {data.map((review, index) => 
        <NextCard key={review.id} reviewer={review} header={reviewTitles[index % 5]} index={index} />
      )}
    </div>
  )
}


function NextCard({reviewer, header, index} : NextCardProps) {

  return (
    <Card className="p-2">
      <CardHeader className="flex justify-between">
        <User className=""
         name={`${reviewer.firstName} ${reviewer.lastName.charAt(0).toUpperCase()}.`} 
        avatarProps={{src: reviewer.image}}
        />
        <p className="text-sm font-semibold uppercase">{header}</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <p>Placeholder</p>
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
  id: string,
  firstName: string,
  lastName: string,
  age: number,
  image: string
}

const reviewTitles = [
  'Great Service!', 'I will always come here', 'Quick and Fast!', 'Low Prices!'
];