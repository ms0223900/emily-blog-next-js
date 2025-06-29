'use client';

import React, { useState, useMemo } from 'react';
import CardItem, { CardItemProps } from "@/components/homepage/CardItem";

export interface CardListProps {
    cardListData: CardItemProps[];
}

const ITEMS_PER_PAGE = 9;

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

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const showPageCount = 1; // 當前頁前後各顯示的頁數

        // 始終顯示第一頁
        if (totalPages > 0) {
            pageNumbers.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={`px-4 py-2 mx-1 border rounded-lg transition-colors ${currentPage === 1
                        ? 'bg-yellow-400 text-black border-yellow-400'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    1
                </button>
            );
        }

        // 如果當前頁距離第一頁超過showPageCount+1，顯示省略號
        if (currentPage > showPageCount + 2) {
            pageNumbers.push(
                <span key="ellipsis-start" className="px-4 py-2 mx-1">
                    ...
                </span>
            );
        }

        // 顯示當前頁附近的頁碼
        const startPage = Math.max(2, currentPage - showPageCount);
        const endPage = Math.min(totalPages - 1, currentPage + showPageCount);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 mx-1 border rounded-lg transition-colors ${currentPage === i
                        ? 'bg-yellow-400 text-black border-yellow-400'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    {i}
                </button>
            );
        }

        // 如果當前頁距離最後一頁超過showPageCount+1，顯示省略號
        if (currentPage < totalPages - showPageCount - 1) {
            pageNumbers.push(
                <span key="ellipsis-end" className="px-4 py-2 mx-1">
                    ...
                </span>
            );
        }

        // 如果總頁數大於1，始終顯示最後一頁
        if (totalPages > 1) {
            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-4 py-2 mx-1 border rounded-lg transition-colors ${currentPage === totalPages
                        ? 'bg-yellow-400 text-black border-yellow-400'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
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

            <div className="flex justify-center items-center mt-8 gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border rounded-lg transition-colors ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    ← Prev.
                </button>

                {renderPageNumbers()}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded-lg transition-colors ${currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-500'
                        }`}
                >
                    Next →
                </button>
            </div>

        </div>
    );
};

export default CardList;
