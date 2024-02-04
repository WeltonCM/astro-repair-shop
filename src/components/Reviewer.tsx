import { User } from "@nextui-org/react";

interface ReviewerProps {
    name: string;
};

export default function Reviewer({name}: ReviewerProps){
    return (
        <User
            name={name}
            avatarProps={{src: "https://i.pravatar.cc/150"}}
        />
    )
}