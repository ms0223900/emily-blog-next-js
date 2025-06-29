'use client';

import React, { useState, useMemo } from 'react';
import CardItem, { CardItemProps } from "@/components/homepage/CardItem";
import { Pagination } from './Pagination';

export interface CardListProps {
    cardListData: CardItemProps[];
}

const ITEMS_PER_PAGE = 9;

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const CardList: React.FC<CardListProps> = ({
    cardListData
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const { paginatedData, totalPages } = useMemo(() => {
        const total = Math.ceil(cardListData.length / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const data = cardListData.slice(startIndex, endIndex);

        return {
            paginatedData: data,
            totalPages: total
        };
    }, [cardListData, currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // 滾動到列表頂部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (cardListData.length === 0) {
        return null;
    }

    return (
        <div className="w-full">
            <ul className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'}>
                {paginatedData.map((card, i) => (
                    <CardItem key={`${card.id}-${i}`} {...card} />
                ))}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default CardList;
