import React, { ReactElement } from "react";

export function getRandomId(): string {
	return Date.now().toString() + getRandomInt(0, 100).toString();
}

export function getRandomInt(min: number, max: number): number {
	return min + Math.round(Math.random() * max);
}
