export function AboutMe() {
    return (
        <div className={"flex flex-col gap-6"}>
            <div className={"flex gap-2 items-center"}>
                <div className={'w-[38px] h-[32px] bg-primary'} />
                <h2 className={"text-xl font-bold"}>
                    關於自然捲
                </h2>
            </div>
            <div className={'flex flex-col items-center m-auto w-60'}>
                <div className={'bg-amber-100 rounded-full w-[186px] h-[186px]'}>
                    <img src={''} />
                </div>
                <h3 className={'py-4 font-bold text-xl'}>
                    自然捲
                </h3>
                <p className={"whitespace-pre-line text-center text-xs text-[#666666] leading-5"}>
                    {`在有限的生命，努力活出最精采的自己
期望將所學的經驗回饋社會
期許透過文字與圖片
為你帶來力量、感動與知識`}
                </p>
            </div>
        </div>
    );
}
