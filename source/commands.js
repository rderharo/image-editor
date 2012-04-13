CreateShapeCommand = function (canvas, shape)  {
  //console.log("createShapeCommand");
  return {
    "execute": function () {
      //console.log("createShapeCommand - execute");
      canvas.addShape(shape);
      canvas.updateShapeGroup();
    },
    "undo": function () {
      console.log("createShapeCommand - undo");
      canvas.removeSelectedShape(shape);
      canvas.removeShape(shape);
      canvas.updateShapeGroup();
    }
  }
}

DeleteShapeCommand = function (canvas)  {
  var selectedShapes = canvas.getSelectedShapes()
    , i
    , end = selectedShapes.length
    , shape
    , shapes = [];

  for (i = 0; i < end; i++) {
    shape = selectedShapes[i];
    shapes.push(Utils.ShapeFactory.createShape(shape.getType(), {
      "x": shape.getX(),
      "y": shape.getY(),
      "width": shape.getWidth(),
      "height": shape.getHeight(),
      "color": shape.getColor(),
      "lineWeight": shape.getLineWeight(),
      "lineStyle": null,
      "lineColor": new Utils.Color(0,0,0),
      "selected": shape.getSelected(),
      "group": shape.getGroup(),
      "overlay": Object.hasOwnProperty("getOverlay") && shape.getOverlay(),
    }));
  }
  return {
    "execute": function () {
      console.log("DeleteShapeCommand - execute");
      var i
        , end = selectedShapes.length;

      for (i = 0; i < end; i++) {
        console.log("i: ", i);
        canvas.removeShape(selectedShapes[i]);
        canvas.removeSelectedShape(selectedShapes[i]);
        canvas.setOverlayShape(null);
      }
      canvas.updateShapeGroup();
      console.log("selectedShapes.length: ", selectedShapes.length);
    },
    "undo": function () {
      console.log("DeleteShapeCommand - undo");
      var i
        , end = shapes.length;
      console.log("shapes.length: ", shapes.length);
      for (i = 0; i < end; i++) {
        console.log("i: ", i);
        canvas.addShape(shapes[i]);
      }
      canvas.updateShapeGroup();
    }
  }
}


SetColorCommand = function (shapes, color)  {
  var oldColor = []
    , i
    , end = shapes.length;

    for (i = 0; i < end; i++) {
      oldColor.push(shapes[i].getColor());
    }


  return {
    "execute": function () {
      for (i = 0; i < end; i++) {
        shapes[i].setColor(color);
      }
    },
    "undo": function () {
      for (i = 0; i < end; i++) {
        shapes[i].setColor(oldColor[i]);
      }
    }
  }
}

SetLineWeightCommand = function (shapes, lineWeight)  {
  console.log("SetLineWeightCommand");
  var oldLineWeight = []
    , i
    , end = shapes.length;

    for (i = 0; i < end; i++) {
      oldLineWeight.push(shapes[i].getLineWeight());
    }

  return {
    "execute": function () {
      console.log("SetLineWeightCommand - execute");
      for (i = 0; i < end; i++) {
        shapes[i].setLineWeight(lineWeight);
      }
    },
    "undo": function () {
      console.log("SetLineWeightCommand - undo");
      for (i = 0; i < end; i++) {
        shapes[i].setLineWeight(oldLineWeight[i]);
      }
    }
  }
}


SetLineStyleCommand = function (canvas, lineStyle)  {
  var oldLineStyle = canvas.getLineStyle();

  return {
    "execute": function () {
      canvas.setLineStyle(lineStyle);
    },
    "undo": function () {
      canvas.setColor(oldLineStyle);
    }
  }
}

CreateShapeGroupCommand = function (canvas, shapes)  {
  var oldShapeGroup = canvas.getShapeGroup();

  return {
    "execute": function () {
      canvas.setShapeGroup(shapes);
    },
    "undo": function () {
      canvas.setShapeGroup(oldShapeGroup);
    }
  }
}

ResizeShapeCommand = function (shape, options)  {
  var oldDimensions = shape.getDimensions();
  var oldCoords = shape.getCoords();

  return {
    "execute": function () {
      console.log("ResizeShapeCommand - execute");
      shape.setDimensions(options.newDimensions)
        .setCoords(options.newCoords);
      options.canvas.updateShapeGroup();

    },

    "undo": function () {
      shape.setDimensions(oldDimensions)
        .setCoords(oldCoords);
      options.canvas.updateShapeGroup();

    }
  }
}


PasteShapeCommand = function (canvas)  {
  var shape = canvas.getShapeBuffer();
  return {
    "execute": function () {
      canvas.paste(shape);
    },
    "undo": function () {
      canvas.removeShape(shape);
    }
  }
}

CopyShapeCommand = function (canvas)  {
  var selectedShape = canvas.getSelectedShapes()[0];
  var shape = Utils.ShapeFactory.createShape(selectedShape.getType(), {
      "x": selectedShape.getX(),
      "y": selectedShape.getY(),
      "width": selectedShape.getWidth(),
      "height": selectedShape.getHeight(),
      "color": selectedShape.getColor(),
      "lineWeight": selectedShape.getLineWeight(),
      "lineStyle": null,
      "lineColor": new Utils.Color(0,0,0),
      "selected": selectedShape.getSelected(),
      "group": selectedShape.getGroup(),
      "overlay": Object.hasOwnProperty("getOverlay") && selectedShape.getOverlay(),
    });
  return {
    "execute": function () {
      console.log("copying to buffer");
      canvas.addToBuffer(shape);
    },
    "undo": function () {
    }
  }
}

MoveCommand = function (canvas, shape, options)  {
  var dimensions = shape.getDimensions();
  var coords = shape.getCoords();

  return {
    "execute": function () {
      canvas.getShape(shape).setDimensions(dimensions)
        .setCoords(coords);
    },

    "undo": function () {
      canvas.getShape(shape).setDimensions(options.oldDimensions)
        .setCoords(options.oldCoords);
    }
  }
}