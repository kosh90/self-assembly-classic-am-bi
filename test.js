var alpha = Math.PI / 5;
var side = 50;
var i = 0;
var j = 0;

function Apple(type) {
    console.log('test-Apple');
    this.type = type;
    this.color = "red";
    this.getInfo = getAppleInfo;
    console.log('Apple');

    function getAppleInfo() {
        return this.color + ' ' + this.type + ' apple';
    }
}

function Fat_Tile(x, y) {
    this.vertices = [
        new Point(-50 * Math.cos(alpha), 0),
        new Point(0, 50 * Math.sin(alpha)),
        new Point(50 * Math.cos(alpha), 0),
        new Point(0, -50 * Math.sin(alpha))
    ];

    this.tile = new Path(this.vertices);
    this.tile.strokeColor = 'black';
    this.tile.fillColor = 'red';
    this.tile.position += [x, y];
    this.tile.closed = true;
    this.outer = true;
}

// ######################################################################
// ######################################################################

function Test_Fat_Tile(x, y, rot) {

    this.ab = [new Point(-50 * Math.cos(alpha), 0), new Point(0, 50 * Math.sin(alpha))]
    this.bc = [new Point(0, 50 * Math.sin(alpha)), new Point(50 * Math.cos(alpha), 0)]
    this.cd = [new Point(50 * Math.cos(alpha), 0), new Point(0, -50 * Math.sin(alpha))]
    this.da = [new Point(0, -50 * Math.sin(alpha)), new Point(-50 * Math.cos(alpha), 0)]

    // this.A = new Point(-50 * Math.cos(alpha), 0);
    // this.B = new Point(0, 50 * Math.sin(alpha));
    // this.C = new Point(50 * Math.cos(alpha), 0);
    // this.D = new Point(0, -50 * Math.sin(alpha));
    //
    // this.vertices = [this.A, this.B, this.C, this.D];
    //
    // this.tile = new Path(this.A, this.B, this.C, this.D);
    // // this.tile = new Path(this.vertices);
    // this.tile.strokeColor = 'black';
    // this.tile.fillColor = 'green';

    this.edge = [];
    this.edge[0] = new Path(this.ab);
    this.edge[1] = new Path(this.bc);
    this.edge[2] = new Path(this.cd);
    this.edge[3] = new Path(this.da);

    this.edge[0].strokeColor = 'blue';
    this.edge[1].strokeColor = 'black';
    this.edge[2].strokeColor = 'green';
    this.edge[3].strokeColor = 'red';
    // this.tile = new Path(this.vertices);
    // this.tile.fillColor = 'red';
    for (var i = 0; i < 4; i++) {
        // this.edge[i].strokeColor = 'black';
        this.edge[i].position += [x, y];
        this.edge[i].rotate(45, [x, y]);
    }
    // this.edge[2].rotate(45, [x, y]);

    // function onFrame(event) {
    //     // Each frame, rotate the path 3 degrees around the point
    //     // we defined earlier:
    //     for (i = 0; i < 4; i++) {
    //         this.edge[i].rotate(5);
    //     }
    // }


    //
    // this.edge[0].outer = true;

    // for (var i = 0; i < 4; i++) {
    //     if (this.edge[i].outer == true) {
    //         this.edge[i].strokeColor = 'red';
    //     }
    // }
    // this.tile.position += [x, y];
    // this.tile.closed = true;
    this.outer = true;
}

// ######################################################################
// ######################################################################

function Thin_Tile(x, y) {
    this.vertices = [new Point(-50 * Math.cos(alpha / 2), 0),
        new Point(0, 50 * Math.sin(alpha / 2)),
        new Point(50 * Math.cos(alpha / 2), 0),
        new Point(0, -50 * Math.sin(alpha / 2))
    ];
    this.tile = new Path(this.vertices);
    this.tile.strokeColor = 'black';
    this.tile.fillColor = 'blue';
    this.tile.position += [x, y];
    this.tile.closed = true;
    this.outer = true;
}

function move_tile(tile, x, y) {
    tile.tile.position += [x, y];
    console.log('move')
}



// ######################################################################
// ######################################################################
// ######################################################################

// ######################################################################
// ######################################################################

// ######################################################################
//
// var apple = new Apple('macintosh');
// apple.color = "reddish";
// alert(apple.getInfo());
//
// ######################################################################
var test_tile = [];
test_tile[0] = new Test_Fat_Tile(400, 400);
// console.log('edge 0 is outer? ', test_tile[0].edge[0].outer, 'must be');
// //
// test_tile[1] = new Test_Fat_Tile(500, 400);
// //
// var connect_tile = new Path(test_tile[0].edge[0].segments[0], test_tile[1].edge[0].segments[0]);
// connect_tile.strokeColor = 'green';
// //
// console.log('trying to get first point of edge', test_tile[0].edge[0].firstSegment.point)
//
//
// for (i = 0; i < test_tile.length; i++) {
//     for (j = 0; j < 4; j++) {
//         if (test_tile[i].edge[j].firstSegment.point == connect_tile.firstSegment.point) {
//             console.log('found it', i, '', j);
// 						console.log(test_tile[i].edge[j].firstSegment.point);
// 						console.log(connect_tile.firstSegment.point);
//         } else {
//             console.log('nope');
//         }
//     }
// }

function onFrame(event) {
    // Each frame, rotate the path 3 degrees around the point
    // we defined earlier:
    test_tile[0].edge[0].rotate(2, [400, 400]);
    test_tile[0].edge[1].rotate(2, [400, 400]);
    test_tile[0].edge[2].rotate(2, [400, 400]);
    test_tile[0].edge[3].rotate(2, [400, 400]);
}

var tile = [];
tile[0] = new Fat_Tile(300, 300);
console.log(tile[0].tile.length);
console.log('test-dsdsdtest');
// tile[0].fat_tile.removeSegment(3)

// move_tile(tile[0]);
move_tile(tile[0]);
tile[0].tile.position += [0, -50];



// #####################################################################################
// var path = new Path();
// path.strokeColor = 'black';
// path.add(view.size * [0.25, 0.5]);
// path.add(view.size * [0.5, 0.5]);
// path.add(view.size * [0.75, 0.5]);
//
// // We will be moving the second segment:
// var segment = path.segments[1];
//
// // The position that we want the segment to move towards:
// var destination = Point.random() * view.size;
//
// function onFrame(event) {
//     // The difference between the current position of the segment
//     // and the destination point:
//     var difference = destination - segment.point;
//
//     // Add 1/10th of the difference to the segment point, to move it
//     // 1/10th of the distance towards the destination point:
//     segment.point += difference / 10;
//
//     // If the distance to move is smaller than 1, change the destination
//     // to a new random point in the view:
//     if (difference.length < 1) {
//         destination = Point.random() * view.size;
//     }
//
// }
// #####################################################################################



tool.onKeyDown = function(event) {
    if (event.key == 'space') {
        // Scale the path by 110%:
        tile[i] = new Fat_Tile(100 * i, 100);
        i++;
    }
    if (event.key == 'down') {
        // Scale the path by 110%:
        tile[i] = new Thin_Tile(100 * i, 100);
        i++;

        // Prevent the key event from bubbling
        return false;
    }
}

// ######################################################################
// for (j = 0; j < tile.length; j++) {
//
// }
// for (j = 0; j < outer_edges.length; j++) {
//
// }
// while (var stop != true){
// 	outer_edges[i].
// }


// ######################################################################
// ######################################################################

// ######################################################################
// ######################################################################
// ######################################################################
// ######################################################################

for (var key in test_tile[0]) {
    // этот код будет вызван для каждого свойства объекта
    // ..и выведет имя свойства и его значение

    console.log("Ключ: " + key + " значение: " + test_tile[0][key]);
}

console.log('end');
console.log(Math.PI);
