# Number System Visualizer

A visual converter for the number systems taught in **Computer Organization & Assembly Language (COAL)** — Binary, Octal, Decimal and Hexadecimal — with every step shown, not just the answer.

## What it does

1. **Binary converter** — type any binary number and instantly see its Decimal, Octal and Hexadecimal values.
2. **Hexadecimal grouping (4-4)** — the number is padded and split into groups of 4 from the right; each group is converted with the 4-2-1 weights and shown as one hex digit. Padded zeros are highlighted.
3. **Octal grouping (3-3)** — the same, in groups of 3. Octal has no letters, only digits 0-7.
4. **Reverse converter** — Decimal to Binary, and Hexadecimal to Binary.
5. **Practice quiz** — a random 8, 12 or 16-bit binary number is generated; convert it to hex and check your answer, with a running score.
6. **Quick reference table** — all 4-bit groups from 0000 to 1111 with their decimal and hex values.

## How it works (the method)

- **Binary to Hex:** group the bits in 4s from the right (pad with leading zeros if needed). Each group of 4 bits = one hex digit, using weights 8-4-2-1. Example: `1011 0110` = `B6`.
- **Binary to Octal:** group the bits in 3s from the right. Each group of 3 bits = one octal digit, using weights 4-2-1.
- **Hex letters start at 10:** 10 = A, 11 = B, 12 = C, 13 = D, 14 = E, 15 = F. Digits 0-9 stay the same.

## Run it

Open `index.html` in any browser — no build step, no server needed.

## Tech

Plain HTML, CSS and JavaScript. No frameworks, no libraries.

## Author

Tasleem Bibi — BSCS student, Begum Nusrat Bhutto Women University, Sukkur. Built as a COAL practice project. All numbers shown are sample data.
