import { Types } from "mongoose";

export interface BookMarkModelType
{
    budget: number;
    genres: string;
    homepage: string;
    keywords: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    release_date: Date;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
    cast: string;
    director: string;
    user: Types.ObjectId
    imageUrl: string
    createdAt: Date
}