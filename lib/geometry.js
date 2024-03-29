/**
 * Get the coordinates of an event relative to a board's axes.
 *
 * Arguments:
 *  evt - The event object.
 *  board - The JXG.Board on which the event occurred.
 *
 * Returns:
 *  The X,Y coordinates of the event in an array.
 */
function event_coords(evt, board) {
  // Note that the event coordinates evt.x and evt.y are relative to the top left corner of the page, rather than the board.
  // Using evt.layerX and evt.layerY gives weird bugs in firefox for some reason.
  // evt.offsetX and evt.offsetY seem to work.
  let X = (evt.offsetX - board.origin.scrCoords[1]) / board.unitX;
  let Y = (board.origin.scrCoords[2] - evt.offsetY) / board.unitY;
  return [X, Y];
}
