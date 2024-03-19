import React from 'react';
import CardItem, { CardItemProps } from "@/components/homepage/CardItem";

export interface CardListProps {
    cardListData: CardItemProps[];

}

const CardList: React.FC<CardListProps> = (props) => {
    return (
        <div className={"flex"}>
            <ul className={'grid grid-cols-3 gap-2'}>
                {props.cardListData.map((card, i) => (
                    <CardItem key={i} {...card}/>))}
            </ul>
        </div>
    );
};

export default CardList;
