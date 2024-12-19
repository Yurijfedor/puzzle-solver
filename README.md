# Fragment Chain Solver

This is a Node.js application for solving the fragment chain puzzle. It reads fragments from a text file, constructs the longest possible sequence by matching overlapping fragments, and outputs the result.

## Requirements

- Node.js (version 14 or higher)

## Installation

1. Clone this repository or download the project files:
   git clone https://github.com/Yurijfedor/puzzle-solver
2. Navigate to the project directory:
   cd puzzle-solver
3. Ensure Node.js is installed. You can check by running:
   node -v

## Usage

1. Create a fragments.txt file in the project directory.
2. Run the application:
   node puzzle.js
3. The program will output the longest sequence constructed from the fragments and the length of the resulting sequence.

## Example

1. Given a fragments.txt file containing the following fragments:
   608017
   248460
   962282
   994725
   177092
2. The output will be:
   Фінальна послідовність: 24846080177092
   Кількість символів у фінальній послідовності: 14

## Custom Fragments

To use a different set of fragments, simply replace the content of fragments.txt with your own fragments. The program will automatically process the new input.

## License

This project is open-source and available under the MIT License.
