# Fragment Chain Solver

This is a Node.js application for solving the fragment chain puzzle. It reads fragments from a text file, constructs the longest possible sequence by matching overlapping fragments, and outputs the result.

## Requirements

- Node.js (version 14 or higher)

## Installation

1. Clone this repository or download the project files:
   git clone https://github.com/yourusername/fragment-chain-solver.git
   Navigate to the project directory:

bash
Копіювати код
cd fragment-chain-solver
Ensure Node.js is installed. You can check by running:

bash
Копіювати код
node -v
Usage
Create a fragments.txt file in the project directory. Each line of the file should contain a single fragment.

Run the application:

bash
Копіювати код
node puzzle.js
The program will output the longest sequence constructed from the fragments and the length of the resulting sequence.

Example
Given a fragments.txt file containing the following fragments:

yaml
Копіювати код
24846
46080
8017
17709
The output will be:

yaml
Копіювати код
Final sequence: 24846080177092
Sequence length: 14
Custom Fragments
To use a different set of fragments, simply replace the content of fragments.txt with your own fragments. The program will automatically process the new input.

License
This project is open-source and available under the MIT License.
