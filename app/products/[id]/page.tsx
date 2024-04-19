import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getIsOwner(userId: number) {
    const sesstion = await getSession();
    if (sesstion.id) {
        return sesstion.id === userId;
    }
    return false;
}

async function getProduct(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const products = await db.product.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                },
            },
        },
    });
    return products;
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }
    const product = await getProduct(id);
    if (!product) {
        return notFound();
    }
    const isOwner = await getIsOwner(product.userId);
    const deleteProduct = async () => {
        "use server";
        await db.product.delete({
            where: {
                id: product.id,
            },
        });
        redirect("/products");
    };
    return (
        <div className="pb-28">
            <div className="relative aspect-square">
                <Image fill src={product.photo} alt={product.title} />
            </div>
            <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
                <div className="size-10 rounded-full overflow-hidden">
                    {product.user.avatar !== null ? (
                        <Image
                            src={product.user.avatar}
                            width={40}
                            height={40}
                            alt={product.user.name}
                        />
                    ) : (
                        <UserIcon />
                    )}
                </div>
                <div>
                    <h3>{product.user.name}</h3>
                </div>
            </div>
            <div className="p-5">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <p>{product.description}</p>
            </div>
            <div className="fixed w-full mx-auto max-w-screen-sm bottom-0 left-0 right-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
                <span className="font-semibold text-xl">{formatToWon(product.price)}원</span>
                {isOwner ? (
                    <form action={deleteProduct}>
                        <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
                            제품 삭제하기
                        </button>
                    </form>
                ) : null}
                <Link
                    className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
                    href={``}
                >
                    채팅하기
                </Link>
            </div>
        </div>
    );
}
