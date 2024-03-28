import React from 'react';
import CardItem, { CardItemProps } from "@/components/homepage/CardItem";

export interface CardListProps {
    cardListData: CardItemProps[];

}

const CardList: React.FC<CardListProps> = (props) => {
    return (
        <ul className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'}>
            {props.cardListData.map((card, i) => (
                <CardItem key={i} {...card} />))
            }
        </ul>
    );
};

export default CardList;
