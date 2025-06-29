'use client';
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

interface PageButtonProps {
    page: number | string;
    isActive: boolean;
    isDisabled?: boolean;
    onClick: () => void;
    isNavigation?: boolean;
}

const PageButton: React.FC<PageButtonProps> = ({
    page,
    isActive,
    isDisabled = false,
    onClick,
    isNavigation = false
}) => {
    const baseClasses = 'px-4 py-2 mx-1 border rounded-lg transition-colors';

    let buttonClasses = baseClasses;
    if (isNavigation) {
        buttonClasses += isDisabled
            ? ' bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            : ' bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
    } else {
        buttonClasses += isActive
            ? ' bg-yellow-400 text-black border-yellow-400'
            : ' bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
    }

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={buttonClasses}
        >
            {page}
        </button>
    );
};

const Ellipsis: React.FC = () => (
    <span className="px-4 py-2 mx-1">...</span>
);

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const showPageCount = 1; // 當前頁前後各顯示的頁數

    const renderPageNumbers = () => {
        const pageNumbers = [];

        // 始終顯示第一頁
        if (totalPages > 0) {
            pageNumbers.push(
                <PageButton
                    key={1}
                    page={1}
                    isActive={currentPage === 1}
                    onClick={() => onPageChange(1)}
                />
            );
        }

        // 如果當前頁距離第一頁超過showPageCount+1，顯示省略號
        if (currentPage > showPageCount + 2) {
            pageNumbers.push(<Ellipsis key="ellipsis-start" />);
        }

        // 顯示當前頁附近的頁碼
        const startPage = Math.max(2, currentPage - showPageCount);
        const endPage = Math.min(totalPages - 1, currentPage + showPageCount);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <PageButton
                    key={i}
                    page={i}
                    isActive={currentPage === i}
                    onClick={() => onPageChange(i)}
                />
            );
        }

        // 如果當前頁距離最後一頁超過showPageCount+1，顯示省略號
        if (currentPage < totalPages - showPageCount - 1) {
            pageNumbers.push(<Ellipsis key="ellipsis-end" />);
        }

        // 如果總頁數大於1，始終顯示最後一頁
        if (totalPages > 1) {
            pageNumbers.push(
                <PageButton
                    key={totalPages}
                    page={totalPages}
                    isActive={currentPage === totalPages}
                    onClick={() => onPageChange(totalPages)}
                />
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center items-center py-10 gap-2">
            <PageButton
                page="← Prev."
                isActive={false}
                isDisabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                isNavigation
            />

            {renderPageNumbers()}

            <PageButton
                page="Next →"
                isActive={false}
                isDisabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                isNavigation
            />
        </div>
    );
};
