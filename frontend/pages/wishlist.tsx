import Navbar from "@/components/navbar/navbar";
import WishItems from "@/components/wishlist/wish-items";
import { Heart } from "lucide-react";

export default function Wishlist() {
    return (
        <>
        <Navbar />
        <h1 className="text-4xl text-center font-bold my-10">心愿单</h1>
        <WishItems />
        </>
    )
}