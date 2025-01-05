'use client';

import { Button } from '@/components/button';
import useBreakpoint from '@/hooks/client/useBreakpoint';
import cn from '@/misc/classNames';
import BREAKPOINTS from '@/misc/constants/breakpoints';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import './style.scss';

const AVAILABLE_PAGE_SIZES = [5, 10, 20, 50, 100];

interface IProps {
	className?: string;
	currentPage: number;
	totalPages: number;
	totalCount: number;
	onPageChange: (page: number) => void;
	onSizeChange: (size: number) => void;
	pageSize: number;
}

function PaginatorXSmall({ currentPage, onPageChange, ...props }: IProps) {
	const classNames = cn('paginator', props.className);

	const [pages, setPages] = useState<number[]>([]);
	const totalPages = props.totalPages > 0 ? props.totalPages : 1;

	function handlePageChange(page: number) {
		if (page === currentPage) return;

		if (page <= 0) onPageChange(0);
		else if (page > totalPages) onPageChange(totalPages);
		else onPageChange(page);
	}

	useEffect(() => {
		// if (currentPage < 1 || currentPage > totalPages || totalPages < 1)
		// 	return;

		const temp: number[] = [];

		if (totalPages <= 3) for (let i = 1; i <= totalPages; i++) temp.push(i);
		else {
			if (currentPage === 1) temp.push(1, 2, 3);
			else if (currentPage === totalPages)
				temp.push(totalPages - 2, totalPages - 1, totalPages);
			else temp.push(currentPage - 1, currentPage, currentPage + 1);
		}

		setPages(temp);
	}, [currentPage, totalPages]);

	return (
		<div className={classNames}>
			<Button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<ChevronLeft />
			</Button>

			{pages.map((page) => (
				<Button
					key={page}
					onClick={() => handlePageChange(page)}
					variant={page === currentPage ? 'primary' : 'outline'}
				>
					{page}
				</Button>
			))}

			<Button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				<ChevronRight />
			</Button>
		</div>
	);
}

function PaginatorSmall({ currentPage, onPageChange, ...props }: IProps) {
	const classNames = cn('paginator', props.className);

	const [pages, setPages] = useState<number[]>([]);
	const totalPages = props.totalPages > 0 ? props.totalPages : 1;

	function handlePageChange(page: number) {
		if (page === currentPage) return;

		if (page <= 0) onPageChange(0);
		else if (page > totalPages) onPageChange(totalPages);
		else onPageChange(page);
	}

	useEffect(() => {
		// if (currentPage < 1 || currentPage > totalPages || totalPages < 1)
		// 	return;

		const temp: number[] = [];

		if (totalPages <= 5) for (let i = 1; i <= totalPages; i++) temp.push(i);
		else {
			if (currentPage === 1) temp.push(1, 2, 3, 4, 5);
			else if (currentPage === totalPages)
				temp.push(
					totalPages - 4,
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages,
				);
			else {
				const start = Math.max(1, currentPage - 2);
				const end = Math.min(totalPages, currentPage + 2);

				for (let i = start; i <= end; i++) {
					temp.push(i);
				}
			}
		}

		setPages(temp);
	}, [currentPage, totalPages]);

	return (
		<div className={classNames}>
			<Button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<ChevronLeft />
			</Button>

			{pages.map((page) => (
				<Button
					key={page}
					onClick={() => handlePageChange(page)}
					variant={page === currentPage ? 'primary' : 'outline'}
				>
					{page}
				</Button>
			))}

			<Button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				<ChevronRight />
			</Button>
		</div>
	);
}

function PaginatorMedium({ currentPage, onPageChange, ...props }: IProps) {
	const classNames = cn('paginator', props.className);

	const [pages, setPages] = useState<number[]>([]);
	const totalPages = props.totalPages > 0 ? props.totalPages : 1;

	function handlePageChange(page: number) {
		if (page === currentPage) return;

		if (page <= 0) onPageChange(0);
		else if (page > totalPages) onPageChange(totalPages);
		else onPageChange(page);
	}

	useEffect(() => {
		// if (currentPage < 1 || currentPage > totalPages || totalPages < 1)
		// 	return;

		const temp: number[] = [];

		if (totalPages <= 5) for (let i = 1; i <= totalPages; i++) temp.push(i);
		else {
			if (currentPage === 1) temp.push(1, 2, 3, 4, 5);
			else if (currentPage === totalPages)
				temp.push(
					totalPages - 4,
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages,
				);
			else {
				const start = Math.max(1, currentPage - 2);
				const end = Math.min(totalPages, currentPage + 2);

				for (let i = start; i <= end; i++) {
					temp.push(i);
				}
			}
		}

		setPages(temp);
	}, [currentPage, totalPages]);

	return (
		<div className={classNames}>
			<Button
				onClick={() => handlePageChange(1)}
				disabled={currentPage === 1}
			>
				<ChevronsLeft />
			</Button>
			<Button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<ChevronLeft />
			</Button>

			{pages.map((page) => (
				<Button
					key={page}
					onClick={() => handlePageChange(page)}
					variant={page === currentPage ? 'primary' : 'outline'}
				>
					{page}
				</Button>
			))}

			<Button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				<ChevronRight />
			</Button>
			<Button
				onClick={() => handlePageChange(totalPages)}
				disabled={currentPage === totalPages}
			>
				<ChevronsRight />
			</Button>
		</div>
	);
}

function PaginatorLarge({
	currentPage,
	onPageChange,
	onSizeChange,
	pageSize,
	...props
}: IProps) {
	const classNames = cn('paginator', props.className);

	const [pages, setPages] = useState<number[]>([]);

	const totalPages = props.totalPages > 0 ? props.totalPages : 1;

	function handlePageChange(page: number) {
		if (page === currentPage) return;

		if (page <= 0) onPageChange(0);
		else if (page > totalPages) onPageChange(totalPages);
		else onPageChange(page);
	}

	function handlePageSizeChange(event: React.ChangeEvent<HTMLSelectElement>) {
		onSizeChange(parseInt(event.target.value));
	}

	useEffect(() => {
		// if (currentPage < 1 || currentPage > totalPages || totalPages < 1)
		// 	return;

		const temp: number[] = [];

		if (totalPages <= 5) for (let i = 1; i <= totalPages; i++) temp.push(i);
		else {
			if (currentPage === 1) temp.push(1, 2, 3, 4, 5);
			else if (currentPage === totalPages)
				temp.push(
					totalPages - 4,
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages,
				);
			else {
				const start = Math.max(1, currentPage - 2);
				const end = Math.min(totalPages, currentPage + 2);

				for (let i = start; i <= end; i++) {
					temp.push(i);
				}
			}
		}

		setPages(temp);
	}, [currentPage, totalPages]);

	return (
		<div className={classNames}>
			<Button
				onClick={() => handlePageChange(1)}
				disabled={currentPage === 1}
			>
				<ChevronsLeft />
			</Button>
			<Button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<ChevronLeft />
			</Button>

			{pages.map((page) => (
				<Button
					key={page}
					onClick={() => handlePageChange(page)}
					variant={page === currentPage ? 'primary' : 'outline'}
				>
					{page}
				</Button>
			))}

			<Button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				<ChevronRight />
			</Button>
			<Button
				onClick={() => handlePageChange(totalPages)}
				disabled={currentPage === totalPages}
			>
				<ChevronsRight />
			</Button>

			<select
				className="page-size-selector"
				value={pageSize}
				onChange={handlePageSizeChange}
			>
				{AVAILABLE_PAGE_SIZES.map((size) => (
					<option key={size} value={size}>
						{size}
					</option>
				))}
			</select>
		</div>
	);
}

export default function Paginator(props: IProps) {
	const breakpoint = useBreakpoint();

	if (breakpoint.width <= BREAKPOINTS['MOBILE_M'])
		return <PaginatorXSmall {...props} />;
	else if (breakpoint.width <= BREAKPOINTS['TABLET'])
		return <PaginatorSmall {...props} />;
	else if (breakpoint.width <= BREAKPOINTS['LAPTOP_S'])
		return <PaginatorMedium {...props} />;
	else return <PaginatorLarge {...props} />;
}
