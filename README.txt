-- Contributors --

Raffi Derharoutiounian
Diogo Golovanevsky Monteiro

-- Using the Drawing Tool --

After extracting project, run source/a2.html in a HTML5 Canvas supporting web browser.

NOTE: It's highly recommended to run this project in the latest version of Mozilla Firefox (version 11). It works fine in Chrome as well but we did most of our testing in Firefox. Older versions may cause unforeseen issues.

If you notice any glitches or bugs, please let us know. It may be a browser issue or it may be a Processing.js issue.

-- Patterns Used --

- Singleton
	- Canvas
	- Controller
	- UndoManager
- Composite
	- Menu
	- Canvas
- Command
	- Menu actions
	- UndoManager
- Factory
	- Instantiation of commands
	- Instantiation of shapes
- State
	- Create, Resize, Move, Default states
- Template
	- Create and Resize methods share resize's "during" logic
- Mediator
	- Controller