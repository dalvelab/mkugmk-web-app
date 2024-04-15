import { type ApiResponse, type DefaultRequestParams } from "@/shared";
import type { VisitorsPages } from "./models";

interface GetCafeAndSouvenirsPage extends DefaultRequestParams {};

export async function getCafeAndSouvenirsPage(params: GetCafeAndSouvenirsPage): Promise<ApiResponse<VisitorsPages["cafe_and_souvenirs_page"], null>> {
  const { locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/cafe-and-souvenirs-page?locale=${locale}`);

  return res.json();
}

interface GetInteractivePlaygroundPage extends DefaultRequestParams {};

export async function getInteractivePlaygroundPage(params: GetInteractivePlaygroundPage): Promise<ApiResponse<VisitorsPages["interactive_playground_page"], null>> {
  const { locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/interactive-playground-page?locale=${locale}`);

  return res.json();
}

interface GetNavigationPage extends DefaultRequestParams {};

export async function getNavigationPage(params: GetNavigationPage): Promise<ApiResponse<VisitorsPages["navigation_page"], null>> {
  const { locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/navigation-page?locale=${locale}`);

  return res.json();
}

interface GetTicketsPage extends DefaultRequestParams {};

export async function getTicketsPage(params: GetTicketsPage): Promise<ApiResponse<VisitorsPages["tickets_page"], null>> {
  const { locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/tickets-page?locale=${locale}`);

  return res.json();
}

interface GetWorkingHoursPage extends DefaultRequestParams {};

export async function getWorkingHoursPage(params: GetWorkingHoursPage): Promise<ApiResponse<VisitorsPages["working_hours_page"], null>> {
  const { locale } = params;

  const res = await fetch(`${process.env.DB_HOST}/working-hours-page?locale=${locale}`);

  return res.json();
}