/*jshint esversion: 6 */


var alpha = Math.PI / 5;
var side = 35;
var i = 0;
var j = 0;
var epsilon = 0.001;
var show_decor = 1;


var tut_pick_seed = new PointText({
    point: [view.center.x, view.center.y * 0.3],
    content: 'Press ´1´ for decapod, ´2´ for basic seed ',
    fillColor: 'black',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: 25,
    justification: 'center'
});


function test_diag(tiles) {

    // var temp = Math.floor((Math.random() * b_tiles.length)); //choose random edge
    // find_nearby_tiles(b_tiles[temp].firstSegment.point, tiles);


    // is_allowed_vert_diag(b_tiles[temp].edge[0].firstSegment.point, tiles);


    for (var temp = 0; temp < b_tiles.length; temp++) {
        for (var j = 0; j < 4; j++) {


            if (is_allowed_vert_diag(b_tiles[temp].edge[j].firstSegment.point, tiles) === 0) {
                return 0;
            }
        }
    }

    console.log('all true');

}


//
// ================================================================================================================================
// =    ==      =========  ====  =======  =========    ===  ====  ====  =        =       ======  ====  =        =       ==        =
// ==  ==  ====  =======    ===  =======  ========  ==  ==  ====  ====  =  =======  ====  =====  ====  =  =======  ====  ====  ====
// ==  ==  ====  ======  ==  ==  =======  =======  ====  =  ====  ====  =  =======  ====  =====  ====  =  =======  ====  ====  ====
// ==  ===  ==========  ====  =  =======  =======  ====  =  ====  ====  =  =======  ====  =====  ====  =  =======  ===   ====  ====
// ==  =====  ========  ====  =  =======  =======  ====  =   ==    ==  ==      ===  ====  =====   ==   =      ===      ======  ====
// ==  =======  ======        =  =======  =======  ====  ==  ==    ==  ==  =======  ====  ======  ==  ==  =======  ====  ====  ====
// ==  ==  ====  =====  ====  =  =======  =======  ====  ==  ==    ==  ==  =======  ====  ======  ==  ==  =======  ====  ====  ====
// ==  ==  ====  =====  ====  =  =======  ========  ==  ====    ==    ===  =======  ====  =======    ===  =======  ====  ====  ====
// =    ==      ======  ====  =        =        ===    ======  ====  ====        =       =========  ====        =  ====  ====  ====
// ================================================================================================================================
//is it allowed vertex type in a given set of tiles
//VERT is a point from paper_js
function is_allowed_vert_edges(vert, tiles) {

    find_tiles_w_that_vertice(vert, tiles);
    get_unic_vec(nearby_edges_as_vectors); //убрали лишние



    if (is_it_allowed(unique_edges_as_vectors)) {
        // console.log('is it allowed vert - true');
        return 1;

    } else {
        // console.log('is it allowed vert - false');
        return 0;
    }
}

function is_allowed_vert_diag(vert, tiles) {

    find_nearby_tiles(vert, tiles);
    // wait(7000);

    if (is_it_allowed_diag_patt(diagonals_pattern)) {
        // console.log('is it allowed vert - true');
        return 1;

    } else {
        // console.log('is it allowed vert - false');
        return 0;
    }
}


function find_nearby_tiles(vertice, sometiles) {
    test_vec = [];
    nearby_tiles = [];
    diagonals_pattern = []; //vector from vert to the center of a tile with prop fat or thin

    for (var i = 0; i < sometiles.length; i++) { //i -- tile number in sometiles

        if ((Math.abs(vertice.x - sometiles[i].center[0]) <= side) &&
            (Math.abs(vertice.y - sometiles[i].center[1]) <= side)) {
            for (var j = 0; j < 4; j++) { //j -- vertex number
                if ((Math.abs(vertice.x - sometiles[i].vert[j].x) <= epsilon) &&
                    (Math.abs(vertice.y - sometiles[i].vert[j].y) <= epsilon)) {


                    nearby_tiles.push(sometiles[i]);


                    if (j == 3) {
                        diagonals_pattern.push(nearby_tiles[nearby_tiles.length - 1].edge[j].vec + nearby_tiles[nearby_tiles.length - 1].edge[0].vec);
                        if (sometiles[i].type == 'fat')
                            diagonals_pattern[diagonals_pattern.length - 1].type = 'three';
                    }
                    if (j == 2) {
                        diagonals_pattern.push(nearby_tiles[nearby_tiles.length - 1].edge[j].vec + nearby_tiles[nearby_tiles.length - 1].edge[j + 1].vec);
                        if (sometiles[i].type == 'fat')
                            diagonals_pattern[diagonals_pattern.length - 1].type = 'two';
                    }
                    if (j == 1) {
                        diagonals_pattern.push(nearby_tiles[nearby_tiles.length - 1].edge[j].vec + nearby_tiles[nearby_tiles.length - 1].edge[j + 1].vec);
                        if (sometiles[i].type == 'fat')
                            diagonals_pattern[diagonals_pattern.length - 1].type = 'one';
                    }
                    if (j === 0) {
                        diagonals_pattern.push(nearby_tiles[nearby_tiles.length - 1].edge[j].vec + nearby_tiles[nearby_tiles.length - 1].edge[j + 1].vec);
                        if (sometiles[i].type == 'fat')
                            diagonals_pattern[diagonals_pattern.length - 1].type = 'zero';
                    }

                    //
                    // if (j == 3)
                    //     diagonals_pattern.push(nearby_tiles[nearby_tiles.length - 1].edge[j].vec + nearby_tiles[nearby_tiles.length - 1].edge[0].vec);
                    // else
                    //     diagonals_pattern.push(nearby_tiles[nearby_tiles.length - 1].edge[j].vec + nearby_tiles[nearby_tiles.length - 1].edge[j + 1].vec);
                    //



                    // diagonals_pattern[diagonals_pattern.lenght -1].type = nearby_tiles[i].type;

                }
            }
        }
    }
    //херня потому что не всегда пересечения в вершине с нормером ноль
    // for (i = 0; i < nearby_tiles.length; i++) {
    //     console.log(nearby_tiles[i].edge[0].vec);
    //     console.log(nearby_tiles[i].edge[1].vec);
    //     console.log(nearby_tiles[i].edge[0].vec + nearby_tiles[i].edge[1].vec);
    // 		diagonals_pattern[i] = nearby_tiles[i].edge[0].vec + nearby_tiles[i].edge[1].vec;
    // 		diagonals_pattern[i].type = nearby_tiles[i].type;
    //     // diagonals_pattern.push(nearby_tiles[i].edge[0].vec + nearby_tiles[i].edge[1].vec);
    // }
    // console.log(diagonals_pattern);

    // console.log(nearby_tiles.length);

    // mark_edges(diagonals_pattern);


    // if (typeof pattern_plot !== 'undefined') {
    //     for (i = 0; i < pattern_plot.length; i++) {
    //         pattern_plot[i].strokeColor = 'white';
    //     }
		//
    //     if (typeof myCircle !== 'undefined')
    //         myCircle.strokeColor = 'white';
    // }
		//
    // plot_pattern(diagonals_pattern, 0.3, 0.3);
		//
    // myCircle = new Path.Circle(vertice, 7);
    // myCircle.strokeColor = 'green';
		//


}

function is_it_allowed_diag_patt(vec) {

    vec_temp = [];
    // console.log('#############################>>>>>>>>>  IS IT ALLOWED AARHH? <<<<<<<<################################');


    for (i = 0; i < allowed_diag_pattern.length; i++) { //по всем допустимым паттернам

        for (j = 0; j < allowed_diag_pattern[i].length; j++) { // по всем элементам из данного допустимого паттерна

            vec_temp = rotate_and_match(vec, allowed_diag_pattern[i][j].angle); //совместить с j-ым вектором
            // console.log('yo',vec[0].type); //стрелки переносит, нормик

            if (in_given_pattern(vec_temp, i)) { //сравнить с i-м допуст паттерном
                // console.log('in ', i, '-th pattern');
                return 1;

            }
        }
    }

    // console.log('NOT ALLOWED');
    // console.log('is it allowed has ended');
    return 0;
}

function in_given_pattern(vec, n) { //проверить принадлежит ли данная конф векторов  n-му  allowed_diag_pattern
    var count = 0;
    for (var i = 0; i < vec.length; i++) {

        for (var j = 0; j < allowed_diag_pattern[n].length; j++) {

            if (
                (vectors_are_equal(vec[i], allowed_diag_pattern[n][j])) &&
                (vec[i].type == allowed_diag_pattern[n][j].type)

            ) {
                count++;
                break;
            }
        }
    }

    if (count == vec.length) {
        // console.log('patterns_are_equal -- TRUE');
        return 1;
    }
    // console.log('patterns_are_equal -- FALSE');
    return 0;
}



// =============================================================================================
// ===     =====    ====  =======  ===      ===        ==       =====    ====  =========      ==
// ==  ===  ===  ==  ===   ======  ==  ====  =====  =====  ====  ===  ==  ===  ========  ====  =
// =  ========  ====  ==    =====  ==  ====  =====  =====  ====  ==  ====  ==  ========  ====  =
// =  ========  ====  ==  ==  ===  ===  ==========  =====  ===   ==  ====  ==  =========  ======
// =  ========  ====  ==  ===  ==  =====  ========  =====      ====  ====  ==  ===========  ====
// =  ========  ====  ==  ====  =  =======  ======  =====  ====  ==  ====  ==  =============  ==
// =  ========  ====  ==  =====    ==  ====  =====  =====  ====  ==  ====  ==  ========  ====  =
// ==  ===  ===  ==  ===  ======   ==  ====  =====  =====  ====  ===  ==  ===  ========  ====  =
// ===     =====    ====  =======  ===      ======  =====  ====  ====    ====        ===      ==
// =============================================================================================


function onKeyDown(event) {

    var i = 0;

    if (event.key == 't') {
        test_diag(b_tiles);
    }
    if (event.key == 'up') {
        view.translate([0, 50]);
    }

    if (event.key == 'down') {
        view.translate([0, -50]);
    }

    if (event.key == 'left') {
        view.translate([50, 0]);
    }

    if (event.key == 'right') {
        view.translate([-50, 0]);
    }

    if (event.key == 'c') {
        remove_marks();
    }

    if (event.key == 'd') {
        pop_tile(b_tiles);
    }
    if (event.key == 'x') {
        remove_all_marks();
    }
    if (event.key == 'h') {
        // controls1.strokeColor = 'red';
        controls1.visible = !controls1.visible;
        controls2.visible = !controls2.visible;
        controls3.visible = !controls3.visible;

    }
    if (event.key == 'p') {
        remove_all_marks();
        for (i = 0; i < b_tiles.length; i++) {
            b_tiles[i].decoration_red.visible = !b_tiles[i].decoration_red.visible;
            // b_tiles[i].decoration_red.strokeColor = 'green';
            b_tiles[i].decoration_blue.visible = !b_tiles[i].decoration_red.visible;
        }
    }
    if (event.key == 'j') {
        remove_all_marks();
        for (i = 0; i < b_tiles.length; i++) {
            b_tiles[i].decoration_red.visible = !b_tiles[i].decoration_red.visible;
            // b_tiles[i].decoration_red.strokeColor = 'green';
            b_tiles[i].decoration_blue.visible = !b_tiles[i].decoration_blue.visible;
        }
    }
    if (event.key == 'm') {
        mark_edges(outer_edges);
    }
    if (event.key == 'a') {
        add_random_tile(b_tiles);
    }


    if (event.key == 's') {
        i = 0;
        while (i < 50) {
            i++;
            add_random_tile(b_tiles);
        }
    }
    if (event.key == 'n') {
        i = 0;
        while (i < 200) {
            i++;
            add_random_tile_2(b_tiles);
        }
    }
    if (event.key == 'b') {
        i = 0;
        while (i < 50) {
            i++;
            add_random_tile_2(b_tiles);
        }
    }
    if (event.key == 'v') {
        add_random_tile_2(b_tiles);
    }
    if (event.key == 'q') {
        add_random_tile_3(b_tiles);
    }

    if (event.key == '1') {
        controls();
        tut_pick_seed.remove();
        b_tiles[0] = new Square_Tile(paper.view.center.x, paper.view.center.y, 0);
        b_tiles.push(new place_square_by_edge(b_tiles[0], 3));
        b_tiles.push(new place_rhombus_by_edge(b_tiles[0], 2));
        b_tiles.push(new place_square_by_edge(b_tiles[2], 0));
        b_tiles[1].edge[2].outer = true;
        b_tiles[1].edge[3].outer = true;
        b_tiles[2].edge[1].outer = true;
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 3));
        // b_tiles.push(new place_rhombus_by_edge(b_tiles[b_tiles.length - 2], 2));
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 0));
        // b_tiles[b_tiles.length - 3].edge[2].outer = true;
        // b_tiles[b_tiles.length - 3].edge[3].outer = true;
        // b_tiles[b_tiles.length - 2].edge[1].outer = true;
        //
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 3));
        // b_tiles.push(new place_rhombus_by_edge(b_tiles[b_tiles.length - 2], 2));
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 0));
        // b_tiles[b_tiles.length - 3].edge[2].outer = true;
        // b_tiles[b_tiles.length - 3].edge[3].outer = true;
        // b_tiles[b_tiles.length - 2].edge[1].outer = true;
        //
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 3));
        // b_tiles.push(new place_rhombus_by_edge(b_tiles[b_tiles.length - 2], 2));
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 0));
        // b_tiles[b_tiles.length - 3].edge[2].outer = true;
        // b_tiles[b_tiles.length - 3].edge[3].outer = true;
        // b_tiles[b_tiles.length - 2].edge[1].outer = true;
        //
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 3));
        // b_tiles.push(new place_rhombus_by_edge(b_tiles[b_tiles.length - 2], 2));
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 0));
        // b_tiles[b_tiles.length - 3].edge[2].outer = true;
        // b_tiles[b_tiles.length - 3].edge[3].outer = true;
        // b_tiles[b_tiles.length - 2].edge[1].outer = true;
        //
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 3));
        // b_tiles.push(new place_rhombus_by_edge(b_tiles[b_tiles.length - 2], 2));
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 0));
        // b_tiles[b_tiles.length - 3].edge[2].outer = true;
        // b_tiles[b_tiles.length - 3].edge[3].outer = true;
        // b_tiles[b_tiles.length - 2].edge[1].outer = true;
        //
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 3));
        // b_tiles.push(new place_rhombus_by_edge(b_tiles[b_tiles.length - 2], 2));
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 0));
        // b_tiles[b_tiles.length - 3].edge[2].outer = true;
        // b_tiles[b_tiles.length - 3].edge[3].outer = true;
        // b_tiles[b_tiles.length - 2].edge[1].outer = true;
        //
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 3));
        // b_tiles.push(new place_rhombus_by_edge(b_tiles[b_tiles.length - 2], 2));
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 0));
        // b_tiles[b_tiles.length - 3].edge[2].outer = true;
        // b_tiles[b_tiles.length - 3].edge[3].outer = true;
        // b_tiles[b_tiles.length - 2].edge[1].outer = true;
        //
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 3));
        // b_tiles.push(new place_rhombus_by_edge(b_tiles[b_tiles.length - 2], 2));
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 0));
        // b_tiles[b_tiles.length - 3].edge[2].outer = true;
        // b_tiles[b_tiles.length - 3].edge[3].outer = true;
        // b_tiles[b_tiles.length - 2].edge[1].outer = true;
        //
        // b_tiles.push(new place_square_by_edge(b_tiles[b_tiles.length - 1], 3));
        // b_tiles.push(new place_rhombus_by_edge(b_tiles[b_tiles.length - 2], 2));
        // b_tiles[b_tiles.length - 2].edge[2].outer = true;
        // b_tiles[b_tiles.length - 2].edge[3].outer = true;
        // b_tiles[b_tiles.length - 1].edge[1].outer = true;

        get_outer_edges(b_tiles);



    }

    if (event.key == '2') {
        controls();
        tut_pick_seed.remove();
        b_tiles[0] = new Square_Tile(paper.view.center.x, paper.view.center.y, 0);
        b_tiles[0].edge[0].outer = true;
        // b_tiles[0].edge[1].outer = true;
        b_tiles[0].edge[2].outer = true;
        b_tiles[0].edge[3].outer = true;
        b_tiles.push(new place_square_by_edge(b_tiles[0], 1));
        b_tiles[1].edge[0].outer = true;
        b_tiles[1].edge[1].outer = true;
        // b_tiles[1].edge[2].outer = true;
        b_tiles[1].edge[3].outer = true;
        // b_tiles.push(new place_rhombus_by_edge(b_tiles[1], 3));
        // b_tiles[2].edge[0].outer = true;
        // b_tiles[2].edge[1].outer = true;
        // b_tiles[2].edge[3].outer = true;

        get_outer_edges(b_tiles);

    }

    if (event.key == '3') {
        controls();
        tut_pick_seed.remove();
        b_tiles[0] = new Square_Tile(paper.view.center.x, paper.view.center.y, 0);
        b_tiles.push(new place_square_by_edge(b_tiles[0], 3));
        b_tiles.push(new place_rhombus_by_edge(b_tiles[0], 2));

        b_tiles[1].edge[2].outer = true;
        b_tiles[1].edge[3].outer = true;
        b_tiles[2].edge[1].outer = true;

        b_tiles.push(new place_rhombus_by_edge(b_tiles[2], 0));

        b_tiles[3].edge[0].outer = true;


        get_outer_edges(b_tiles);

    }
}

// ==================================================================================================================
// ==      ===  ====  ====    ====  ====  ====  =========     ===  =======  ==        ==       ===  =========      ==
// =  ====  ==  ====  ===  ==  ===  ====  ====  ========  ===  ==   ======  =====  =====  ====  ==  ========  ====  =
// =  ====  ==  ====  ==  ====  ==  ====  ====  =======  ========    =====  =====  =====  ====  ==  ========  ====  =
// ==  =======  ====  ==  ====  ==  ====  ====  =======  ========  ==  ===  =====  =====  ===   ==  =========  ======
// ====  =====        ==  ====  ==   ==    ==  ========  ========  ===  ==  =====  =====      ====  ===========  ====
// ======  ===  ====  ==  ====  ===  ==    ==  ========  ========  ====  =  =====  =====  ====  ==  =============  ==
// =  ====  ==  ====  ==  ====  ===  ==    ==  ========  ========  =====    =====  =====  ====  ==  ========  ====  =
// =  ====  ==  ====  ===  ==  =====    ==    ==========  ===  ==  ======   =====  =====  ====  ==  ========  ====  =
// ==      ===  ====  ====    =======  ====  ============     ===  =======  =====  =====  ====  ==        ===      ==
// ==================================================================================================================


function controls() {
    controls1 = new PointText({
        point: [0.1 * view.center.x, 0.1 * view.center.y],
        content: '´v´ - one step, ´b´ - 50 steps, ´n´ - 100 steps (forced tiles only) ',
        fillColor: 'black',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: 20,
        justification: 'left',
        visible: true
    });

    controls2 = new PointText({
        point: [0.1 * view.center.x, 0.15 * view.center.y],
        content: ' press ´a´ to place random tile at random place (may overlap) ',
        fillColor: 'black',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: 20,
        justification: 'left',
        visible: true
    });

    controls3 = new PointText({
        point: [0.1 * view.center.x, 0.2 * view.center.y],
        content: ' arrows to move view, ´h´ to hide contols',
        fillColor: 'black',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: 20,
        justification: 'left',
        visible: true
    });

    this.toggle = function() {
        // this.contols1.visible = !this.contols1.visible;
        controls1.visible = false;
        controls1.strokeColor = 'blue';
        controls1.remove();
        contols();
        // this.c
    };
    // controls1.strokeColor = 'blue';

}

//
// ===========================================================================================
// =       ===  ===========  =======     ===        =======        ==    ==  ========        =
// =  ====  ==  ==========    =====  ===  ==  ================  ======  ===  ========  =======
// =  ====  ==  =========  ==  ===  ========  ================  ======  ===  ========  =======
// =  ====  ==  ========  ====  ==  ========  ================  ======  ===  ========  =======
// =       ===  ========  ====  ==  ========      ============  ======  ===  ========      ===
// =  ========  ========        ==  ========  ================  ======  ===  ========  =======
// =  ========  ========  ====  ==  ========  ================  ======  ===  ========  =======
// =  ========  ========  ====  ===  ===  ==  ================  ======  ===  ========  =======
// =  ========        ==  ====  ====     ===        ==========  =====    ==        ==        =
// ===========================================================================================

//add random tile to the given set of tiles
//return number of chosen outer edge
function add_random_tile(tiles) {

    // console.log('>>>>>>add rand 2 ...');
    edge.strokeColor = 'black';
    edge.strokeWidth = '2';
    // edge.remove();
    var temp = 0;
    var i = 0;
    this.fat = 0;
    this.fat2 = 0;
    this.thin = 0;


    temp = Math.floor((Math.random() * outer_edges.length)); //choose random edge
    // console.log('tileedgesnumtype', tiles[outer_edges[temp].tilenum].type);

    edge = outer_edges[temp];
    edge.strokeColor = 'green';
    edge.strokeWidth = '5';




    if (tiles[outer_edges[temp].tilenum].type == 'fat') {
        if ((outer_edges[temp].edgenum === 0) || (outer_edges[temp].edgenum === 3)) {
            // console.log('---------------->tileedgesnumtype', tiles[outer_edges[temp].tilenum].type);
            //ставить ромбик и на выход

            tiles.push(new place_rhombus_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

            update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
            get_outer_edges(tiles);
            return temp;


        } else {
            //два варианта -- худой и квадратный


            tiles.push(new place_rhombus_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));
            // tiles.push(new place_square_by_edge(tiles[1], 3));

            if (
                (is_allowed_vert_diag(outer_edges[temp].firstSegment.point, tiles)) &&
                // (is_overlap(tiles[tiles.length - 1], nearby_tiles) === 0) &&
                (is_allowed_vert_diag(outer_edges[temp].lastSegment.point, tiles))
            ) {
                this.thin = 1;
                pop_tile(tiles);

            } else {
                // console.log('fat was bad, so thin is good');
                this.thin = 0;

                pop_tile(tiles);

            }



            tiles.push(new place_square_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

            if (
                (is_allowed_vert_diag(outer_edges[temp].firstSegment.point, tiles)) &&
                // (is_overlap(tiles[tiles.length - 1], nearby_tiles) === 0) &&
                (is_allowed_vert_diag(outer_edges[temp].lastSegment.point, tiles))
                // (is_overlap(tiles[tiles.length - 1], tiles) === 0)
            ) {

                this.fat = 1;


                pop_tile(tiles);


            } else {
                pop_tile(tiles);
                this.fat = 0;

            }

            // if ((this.thin === 1) && (this.fat === 0)) {
            if ((this.thin === 1) && (this.fat === 0)) {
                tiles.push(new place_rhombus_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

                update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
                get_outer_edges(tiles);
                // mark_edges(outer_edges);
                return temp;
            }
            // if ((this.thin === 0) && (this.fat === 1)) {
            if (this.fat === 1) {
                tiles.push(new place_square_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

                update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
                get_outer_edges(tiles);
                // mark_edges(outer_edges);
                return temp;
            }
            if ((this.thin === 0) && (this.fat === 0)) {
                console.error('NOT A CHANCE');
            }

            // i = Math.floor((Math.random() * 2)); //choose random edge




        }


    }
    if (tiles[outer_edges[temp].tilenum].type == 'thin') {
        //три варианта

        tiles.push(new place_rhombus_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));
        // tiles.push(new place_square_by_edge(tiles[1], 3));

        if (
            (is_allowed_vert_diag(outer_edges[temp].firstSegment.point, tiles)) &&
            // (is_overlap(tiles[tiles.length - 1], nearby_tiles) === 0) &&
            (is_allowed_vert_diag(outer_edges[temp].lastSegment.point, tiles))
            // (is_overlap(tiles[tiles.length - 1], tiles) === 0)
        ) {

            this.thin = 1;

            pop_tile(tiles);

        } else {
            // console.log('fat was bad, so thin is good');
            this.thin = 0;

            pop_tile(tiles);

        }

        tiles.push(new place_square_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

        if (
            (is_allowed_vert_diag(outer_edges[temp].firstSegment.point, tiles)) &&
            // (is_overlap(tiles[tiles.length - 1], nearby_tiles) === 0) &&
            (is_allowed_vert_diag(outer_edges[temp].lastSegment.point, tiles))
            // (is_overlap(tiles[tiles.length - 1], tiles) === 0)
        ) {
            this.fat = 1;
            pop_tile(tiles);
        } else {
            pop_tile(tiles);
            this.fat = 0;

        }

        tiles.push(new place_square_by_edge2(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

        if (
            (is_allowed_vert_diag(outer_edges[temp].firstSegment.point, tiles)) &&
            // (is_overlap(tiles[tiles.length - 1], nearby_tiles) === 0) &&
            (is_allowed_vert_diag(outer_edges[temp].lastSegment.point, tiles))
            // (is_overlap(tiles[tiles.length - 1], tiles) === 0)
        ) {
            this.fat2 = 1;
            pop_tile(tiles);
        } else {
            pop_tile(tiles);
            this.fat2 = 0;

        }

        if ((this.thin === 1) && (this.fat === 0) && (this.fat2 === 0)) {
            tiles.push(new place_rhombus_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

            update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
            get_outer_edges(tiles);
            // mark_edges(outer_edges);
            return temp;
        }
        if ((this.thin === 0) && (this.fat === 1) && (this.fat2 === 0)) {
            tiles.push(new place_square_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

            update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
            get_outer_edges(tiles);
            // mark_edges(outer_edges);
            return temp;
        }
        if ((this.thin === 0) && (this.fat === 0) && (this.fat2 === 1)) {
            tiles.push(new place_square_by_edge2(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

            update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
            get_outer_edges(tiles);
            // mark_edges(outer_edges);
            return temp;
        }
        if ((this.thin === 0) && (this.fat === 0) && (this.fat2 === 0)) {
            // tiles.push(new place_square_by_edge2(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

            console.error('NOT A CHANCE THIN');
            window.alert('asd');
        }
    }

}

//add random tile to the given set of tiles
//return number of chosen outer edge
edge = new Path([0, 0]);

//################################################################################################
//################################################################################################
//################################################################################################
//################################################################################################
//################################################################################################
//FIXME: bad name

function add_random_tile_3(tiles) {

    // console.log('>>>>>>add rand 2 ...');
    edge.strokeColor = 'black';
    edge.strokeWidth = '2';
    // edge.remove();
    var temp = 0;
    // var i = 0;
    this.fat = 0;
    this.fat2 = 0;
    this.thin = 0;


    temp = Math.floor((Math.random() * outer_edges.length)); //choose random edge
    // console.log('tileedgesnumtype', tiles[outer_edges[temp].tilenum].type);

    edge = outer_edges[temp];
    edge.strokeColor = 'green';
    edge.strokeWidth = '5';




    if (tiles[outer_edges[temp].tilenum].type == 'fat') {
        if ((outer_edges[temp].edgenum === 0) || (outer_edges[temp].edgenum === 3)) {
            // console.log('---------------->tileedgesnumtype', tiles[outer_edges[temp].tilenum].type);
            //ставить ромбик и на выход

            tiles.push(new place_rhombus_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

            update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
            get_outer_edges(tiles);
            return temp;


        } else {
            //два варианта -- худой и квадратный


            tiles.push(new place_rhombus_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));
            // tiles.push(new place_square_by_edge(tiles[1], 3));

            if (
                (is_allowed_vert_diag(outer_edges[temp].firstSegment.point, tiles)) &&
                // (is_overlap(tiles[tiles.length - 1], nearby_tiles) === 0) &&
                (is_allowed_vert_diag(outer_edges[temp].lastSegment.point, tiles))
            ) {
                this.thin = 1;
                pop_tile(tiles);

            } else {
                // console.log('fat was bad, so thin is good');
                this.thin = 0;

                pop_tile(tiles);

            }



            tiles.push(new place_square_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

            if (
                (is_allowed_vert_diag(outer_edges[temp].firstSegment.point, tiles)) &&
                // (is_overlap(tiles[tiles.length - 1], nearby_tiles) === 0) &&
                (is_allowed_vert_diag(outer_edges[temp].lastSegment.point, tiles))
                // (is_overlap(tiles[tiles.length - 1], tiles) === 0)
            ) {

                this.fat = 1;


                pop_tile(tiles);


            } else {
                pop_tile(tiles);
                this.fat = 0;

            }

            if ((this.thin === 1) && (this.fat === 0)) {
                tiles.push(new place_rhombus_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

                update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
                get_outer_edges(tiles);
                // mark_edges(outer_edges);
                return temp;
            }
            if ((this.thin === 0) && (this.fat === 1)) {
                tiles.push(new place_square_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

                update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
                get_outer_edges(tiles);
                // mark_edges(outer_edges);
                return temp;
            }
            // if ((this.thin === 0) && (this.fat === 0)) {
            //     console.error('NOT A CHANCE');
            // }



        }


    }
    if (tiles[outer_edges[temp].tilenum].type == 'thin') {
        //три варианта

        tiles.push(new place_rhombus_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));
        // tiles.push(new place_square_by_edge(tiles[1], 3));

        if (
            (is_allowed_vert_diag(outer_edges[temp].firstSegment.point, tiles)) &&
            // (is_overlap(tiles[tiles.length - 1], nearby_tiles) === 0) &&
            (is_allowed_vert_diag(outer_edges[temp].lastSegment.point, tiles))
            // (is_overlap(tiles[tiles.length - 1], tiles) === 0)
        ) {

            this.thin = 1;

            pop_tile(tiles);

        } else {
            // console.log('fat was bad, so thin is good');
            this.thin = 0;

            pop_tile(tiles);

        }

        tiles.push(new place_square_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

        if (
            (is_allowed_vert_diag(outer_edges[temp].firstSegment.point, tiles)) &&
            // (is_overlap(tiles[tiles.length - 1], nearby_tiles) === 0) &&
            (is_allowed_vert_diag(outer_edges[temp].lastSegment.point, tiles))
            // (is_overlap(tiles[tiles.length - 1], tiles) === 0)
        ) {
            this.fat = 1;
            pop_tile(tiles);
        } else {
            pop_tile(tiles);
            this.fat = 0;

        }

        tiles.push(new place_square_by_edge2(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

        if (
            (is_allowed_vert_diag(outer_edges[temp].firstSegment.point, tiles)) &&
            // (is_overlap(tiles[tiles.length - 1], nearby_tiles) === 0) &&
            (is_allowed_vert_diag(outer_edges[temp].lastSegment.point, tiles))
            // (is_overlap(tiles[tiles.length - 1], tiles) === 0)
        ) {
            this.fat2 = 1;
            pop_tile(tiles);
        } else {
            pop_tile(tiles);
            this.fat2 = 0;

        }

        if ((this.thin === 1) && (this.fat === 0) && (this.fat2 === 0)) {
            tiles.push(new place_rhombus_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

            update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
            get_outer_edges(tiles);
            // mark_edges(outer_edges);
            return temp;
        }
        if ((this.thin === 0) && (this.fat === 1) && (this.fat2 === 0)) {
            tiles.push(new place_square_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

            update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
            get_outer_edges(tiles);
            // mark_edges(outer_edges);
            return temp;
        }
        if ((this.thin === 0) && (this.fat === 0) && (this.fat2 === 1)) {
            tiles.push(new place_square_by_edge2(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

            update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
            get_outer_edges(tiles);
            // mark_edges(outer_edges);
            return temp;
        }
        // if ((this.thin === 0) && (this.fat === 0) && (this.fat2 === 0)) {
        //     // tiles.push(new place_square_by_edge2(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));
				//
        //     console.error('NOT A CHANCE THIN');
        //     window.alert('asd');
        // }
    }

}

function add_random_tile_3old(tiles) {

    // console.log('>>>>>>add rand 2 ...');
    edge.strokeColor = 'black';
    edge.strokeWidth = '2';
    // edge.remove();
    var temp = 0;
    var i = 0;
    this.fat = 0;
    this.thin = 0;


    temp = Math.floor((Math.random() * outer_edges.length)); //choose random edge
    // console.log('tileedgesnumtype', tiles[outer_edges[temp].tilenum].type);


    tiles.push(new place_square_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));
    // tiles.push(new place_square_by_edge(tiles[1], 3));

    if (
        (is_allowed_vert_diag(outer_edges[temp].firstSegment.point, tiles)) &&
        // (is_overlap(tiles[tiles.length - 1], nearby_tiles) === 0) &&
        (is_allowed_vert_diag(outer_edges[temp].lastSegment.point, tiles)) &&
        (is_overlap(tiles[tiles.length - 1], tiles) === 0)

        // (is_overlap(tiles[tiles.length - 1], tiles) === 0)
    ) {




        this.fat = 1;


        if (tiles[outer_edges[temp].tilenum].type == 'fat') {

            if ((outer_edges[temp].edgenum === 0) || (outer_edges[temp].edgenum === 3)) {
                console.log('---------------->tileedgesnumtype', tiles[outer_edges[temp].tilenum].type);

                this.fat = 0;
            }
        }

        // console.log('fat is good');
        pop_tile(tiles);

    } else {
        // console.log('fat was bad, so thin is good');

        pop_tile(tiles);
        tiles.push(new place_rhombus_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

        edge = outer_edges[temp];
        edge.strokeColor = 'green';
        edge.strokeWidth = '5';

        // remove_marks();
        update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
        get_outer_edges(tiles);
        // mark_edges(outer_edges);
        return temp;
    }

    tiles.push(new place_rhombus_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));

    if (
        (is_allowed_vert_diag(outer_edges[temp].firstSegment.point, tiles)) &&
        // (is_overlap(tiles[tiles.length - 1], nearby_tiles) === 0) &&
        (is_allowed_vert_diag(outer_edges[temp].lastSegment.point, tiles)) &&
        (is_overlap(tiles[tiles.length - 1], tiles) === 0)

        // (is_overlap(tiles[tiles.length - 1], tiles) === 0)
    ) {

        this.thin = 1;

        // console.log('thin is good');

        pop_tile(tiles);

        edge = outer_edges[temp];
        edge.strokeColor = 'green';
        edge.strokeWidth = '5';

    } else {
        pop_tile(tiles);
        tiles.push(new place_square_by_edge(tiles[outer_edges[temp].tilenum], outer_edges[temp].edgenum));


        edge = outer_edges[temp];
        edge.strokeColor = 'green';
        edge.strokeWidth = '5';

        // remove_marks();
        update_outer_propery_4_new_tile(tiles[tiles.length - 1], outer_edges);
        get_outer_edges(tiles);
        // mark_edges(outer_edges);


        return temp;
    }


    if ((this.a === 0) && (this.b === 0)) {
        // plot_pattern(unique_edges_as_vectors, 1.7, 1.3);
        console.log('place2 shit');
    }

    if ((this.thin === 1) && (this.fat === 1)) {
        // plot_pattern(unique_edges_as_vectors, 1.7, 1.3);
        // console.log('place2 ...');
    }

    edge = outer_edges[temp];
    edge.strokeColor = 'green';
    edge.strokeWidth = '5';
}

// ==============================================================================================================
// ====  ====  =======  =========    ===  ====  ====  =        =       ======       =====  ====        =        =
// ===    ===  =======  ========  ==  ==  ====  ====  =  =======  ====  =====  ====  ===    ======  =======  ====
// ==  ==  ==  =======  =======  ====  =  ====  ====  =  =======  ====  =====  ====  ==  ==  =====  =======  ====
// =  ====  =  =======  =======  ====  =  ====  ====  =  =======  ====  =====  ====  =  ====  ====  =======  ====
// =  ====  =  =======  =======  ====  =   ==    ==  ==      ===  ====  =====       ==  ====  ====  =======  ====
// =        =  =======  =======  ====  ==  ==    ==  ==  =======  ====  =====  =======        ====  =======  ====
// =  ====  =  =======  =======  ====  ==  ==    ==  ==  =======  ====  =====  =======  ====  ====  =======  ====
// =  ====  =  =======  ========  ==  ====    ==    ===  =======  ====  =====  =======  ====  ====  =======  ====
// =  ====  =        =        ===    ======  ====  ====        =       ======  =======  ====  ====  =======  ====
// ==============================================================================================================
// >

function Allowed_Diag_Pattens() {

    //create 2d array with allowed diagonals configurations

    var k = 0;
    allowed_diag_pattern = [];
    var square_D = side * Math.sqrt(2);

    var rhombus_long_D = side * Math.sqrt(2 - 2 * Math.cos(3 * Math.PI / 4));
    var rhombus_short_D = side * Math.sqrt(2 - 2 * Math.cos(Math.PI / 4));

    // console.log('fat long short thin long shotr');
    // console.log(square_D);
    // console.log(square_D);
    // console.log(rhombus_long_D);
    // console.log(rhombus_short_D);




    points = [];

    k = 0;
    points.push(new Point(square_D * Math.cos(k), square_D * Math.sin(k)));
    points[0].type = 'zero';

    k -= 5 * Math.PI / 8;
    points.push(new Point(rhombus_short_D * Math.cos(k), rhombus_short_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_outward_arrow';

    k -= 3 * Math.PI / 4;
    points.push(new Point(rhombus_short_D * Math.cos(k), rhombus_short_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_outward_arrow';


    allowed_diag_pattern[0] = points;
    // plot_pattern(allowed_diag_pattern[0], 0.2, 0.2);




    points = [];

    k = 0;
    points.push(new Point(square_D * Math.cos(k), square_D * Math.sin(k)));
    points[0].type = 'three';

    k -= 5 * Math.PI / 8;
    points.push(new Point(rhombus_short_D * Math.cos(k), rhombus_short_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_outward_arrow';

    k -= 5 * Math.PI / 8;
    points.push(new Point(square_D * Math.cos(k), square_D * Math.sin(k)));
    points[2].type = 'one';

    k -= 3 * Math.PI / 8;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_outward_arrow';



    allowed_diag_pattern[1] = points;
    // plot_pattern(allowed_diag_pattern[1], 0.2, 0.5);



    points = [];

    k = 0;
    points.push(new Point(square_D, 0));
    points[0].type = 'two';

    k -= 3 * Math.PI / 8;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[1].type = 'double_outward_arrow';

    k -= 3 * Math.PI / 8;
    points.push(new Point(square_D * Math.cos(k), square_D * Math.sin(k)));
    points[2].type = 'two';

    k -= Math.PI / 2;
    points.push(new Point(square_D * Math.cos(k), square_D * Math.sin(k)));
    points[3].type = 'two';

    k -= 3 * Math.PI / 8;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[4].type = 'double_outward_arrow';


    allowed_diag_pattern[2] = points;
    // plot_pattern(allowed_diag_pattern[2], 0.2, 0.8);
    // +


    points = [];

    k = 0;
    points.push(new Point(square_D, 0));
    points[0].type = 'two';

    k -= 3 * Math.PI / 8;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[1].type = 'double_outward_arrow';

    k -= 3 * Math.PI / 8;
    points.push(new Point(square_D * Math.cos(k), square_D * Math.sin(k)));
    points[2].type = 'three';

    k -= Math.PI / 2;
    points.push(new Point(square_D * Math.cos(k), square_D * Math.sin(k)));
    points[3].type = 'one';

    k -= 3 * Math.PI / 8;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[4].type = 'double_outward_arrow';


    allowed_diag_pattern[3] = points;
    // plot_pattern(allowed_diag_pattern[2], 0.2, 0.8);
    // +


    k = 0;
    points = [];
    points.push(new Point(square_D, 0));
    points[0].type = 'two';

    k -= 3 * Math.PI / 8;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[1].type = 'double_outward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[2].type = 'single_outward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[3].type = 'single_outward_arrow';

    k -= 3 * Math.PI / 8;
    points.push(new Point(square_D * Math.cos(k), square_D * Math.sin(k)));
    points[4].type = 'two';

    k -= 3 * Math.PI / 8;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[5].type = 'single_outward_arrow';


    allowed_diag_pattern[4] = points;
    // plot_pattern(allowed_diag_pattern[3], 0.2, 1.1);


    // var square_D = 50;
    // var square_D = 30;
    // var rhombus_long_D = 60;
    // var rhombus_short_D = 20;
    //+


    points = [];

    k = 0;
    points.push(new Point(square_D * Math.cos(k), square_D * Math.sin(k)));
    points[0].type = 'two';

    k = k - 3 * Math.PI / 8;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_outward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_outward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'double_outward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_inward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_inward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_inward_arrow';


    allowed_diag_pattern[5] = points;
    // plot_pattern(allowed_diag_pattern[4], 0.2, 1.4);


    // var square_D = 50;
    // var square_D = 30;
    // var rhombus_long_D = 60;
    // var rhombus_short_D = 20;



    points = [];
    k = 0;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[0].type = 'double_outward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_outward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_outward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'double_outward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_inward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_inward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_inward_arrow';

    k -= Math.PI / 4;
    points.push(new Point(rhombus_long_D * Math.cos(k), rhombus_long_D * Math.sin(k)));
    // points[points.length - 1].type = 'single_inward_arrow';


    allowed_diag_pattern[6] = points;
    // plot_pattern(allowed_diag_pattern[5], 0.5, 0.2);


    // var square_D = 50;
    // var square_D = 30;
    // var rhombus_long_D = 60;
    // var rhombus_short_D = 20;


    //
    // for (var i = 0; i < allowed_diag_pattern.length; i++) {
    //
    //     plot_pattern(allowed_diag_pattern[i], 0.2 + i * 0.3, 1);
    // }
    //


}



// =============================================================================
// =        ====  ====        =======     ==  ==========  =====      ===      ==
// =  =========    ======  =========  ===  =  =========    ===  ====  =  ====  =
// =  ========  ==  =====  ========  =======  ========  ==  ==  ====  =  ====  =
// =  =======  ====  ====  ========  =======  =======  ====  ==  =======  ======
// =      ===  ====  ====  ========  =======  =======  ====  ====  =======  ====
// =  =======        ====  ========  =======  =======        ======  =======  ==
// =  =======  ====  ====  ========  =======  =======  ====  =  ====  =  ====  =
// =  =======  ====  ====  =========  ===  =  =======  ====  =  ====  =  ====  =
// =  =======  ====  ====  ==========     ==        =  ====  ==      ===      ==
// =============================================================================

function Square_Tile(x, y, rot) {

    this.center = [x, y];
    this.outer = false;
    this.rotation = rot;
    this.type = 'fat';

    this.A = new Point(-side * Math.cos(Math.PI / 4), 0);
    this.B = new Point(0, side * Math.sin(Math.PI / 4));
    this.C = new Point(side * Math.cos(Math.PI / 4), 0);
    this.D = new Point(0, -side * Math.sin(Math.PI / 4));
		//
    // this.A = new Point(-side * Math.cos(Math.PI / 4), 0);
    // this.B = new Point(0, side * Math.sin(Math.PI / 4));
    // this.C = new Point(side * Math.cos(Math.PI / 4), 0);
    // this.D = new Point(0, -side * Math.sin(Math.PI / 4));

    this.vert = [];
    this.vert[0] = this.A;
    this.vert[1] = this.B;
    this.vert[2] = this.C;
    this.vert[3] = this.D;

    for (var i = 0; i < 4; i++) {
        this.vert[i] = this.vert[i].rotate(-rot, [0, 0]);

        this.vert[i] += [x, y];
        // console.log(this.vert[i]);
    }


    // this.ab = [new Point(-side * Math.cos(alpha), 0), new Point(0, side * Math.sin(alpha))];
    // this.bc = [new Point(0, side * Math.sin(alpha)), new Point(side * Math.cos(alpha), 0)];
    // this.cd = [new Point(side * Math.cos(alpha), 0), new Point(0, -side * Math.sin(alpha))];
    // this.da = [new Point(0, -side * Math.sin(alpha)), new Point(-side * Math.cos(alpha), 0)];

    this.ab = this.vert[1] - this.vert[0];
    this.bc = this.vert[2] - this.vert[1];
    this.cd = this.vert[3] - this.vert[2];
    this.da = this.vert[0] - this.vert[3];
    // this.C /0

    // var decoration_red = new Path.Arc(this.A + this.ab, this.A+[10,0], this.A - this.da);
    this.decoration_1 = new Path.Arc(this.vert[0] + this.ab / 3, this.vert[0] + this.ab / 4 + this.bc / 4, this.vert[0] - this.da / 3);
    this.decoration_1.strokeColor = 'blue';
    this.decoration_1.strokeWidth = '3';

    this.decoration_2 = new Path.Arc(this.vert[2] - this.bc * 3 / 4, this.vert[2] - (this.ab + this.bc) / (2 + 1 / 4), this.vert[2] + this.cd * 3 / 4);
    this.decoration_2.strokeColor = 'blue';
    this.decoration_2.strokeWidth = '3';


    // this.decoration_red = new Path.Arc(this.vert[2] - this.bc * 3 / 4, this.vert[2] - (this.ab + this.bc) / (2 + 1 / 4), this.vert[2] + this.cd * 3 / 4);
    // this.decoration_red.strokeColor = 'red';
    // this.decoration_red.strokeWidth = '3';

    this.edge = [];
    this.edge[0] = new Path(this.vert[0], this.vert[0] + this.ab);
    this.edge[0].vert = 'ab';
    this.edge[1] = new Path(this.vert[1], this.vert[1] + this.bc);
    this.edge[1].vert = 'bc';
    this.edge[2] = new Path(this.vert[2], this.vert[2] + this.cd);
    this.edge[2].vert = 'cd';
    this.edge[3] = new Path(this.vert[3], this.vert[3] + this.da);
    this.edge[3].vert = 'da';

    this.edge[0].vec = this.ab;
    this.edge[0].vec.type = 'double_inward_arrow';

    this.edge[1].vec = this.bc;
    this.edge[1].vec.type = 'single_inward_arrow';

    this.edge[2].vec = this.cd;
    this.edge[2].vec.type = 'single_outward_arrow';

    this.edge[3].vec = this.da;
    this.edge[3].vec.type = 'double_outward_arrow';


    this.edge[0].outer = false;
    this.edge[1].outer = false;
    this.edge[2].outer = false;
    this.edge[3].outer = false;

    // this.tile = new Path(this.vertices);
    // this.tile.fillColor = 'red';
    for (i = 0; i < 4; i++) {
        this.edge[i].strokeColor = 'black';
        this.edge[i].strokeWidth = '2';
        // this.edge[i].position += [x, y];
        // this.edge[i].rotate(rot, [x, y]);
    }



    function mark() {
        for (var i = 0; i < 4; i++) {
            this.edge[i].strokeColor = 'pink';
            this.edge[i].strokeWidth = '6';

        }
    }

    // this.edge[0].strokeColor = 'blue';
    // this.edge[1].strokeColor = 'black';
    // this.edge[2].strokeColor = 'green';
    // this.edge[3].strokeColor = 'red';

    // var myCircle = new Path.Circle(this.vert[1], 5);
    // myCircle.fillColor = 'black';
}

// =====================================================================================
// =        =  ====  =    =  =======  =======     ==  ==========  =====      ===      ==
// ====  ====  ====  ==  ==   ======  ======  ===  =  =========    ===  ====  =  ====  =
// ====  ====  ====  ==  ==    =====  =====  =======  ========  ==  ==  ====  =  ====  =
// ====  ====  ====  ==  ==  ==  ===  =====  =======  =======  ====  ==  =======  ======
// ====  ====        ==  ==  ===  ==  =====  =======  =======  ====  ====  =======  ====
// ====  ====  ====  ==  ==  ====  =  =====  =======  =======        ======  =======  ==
// ====  ====  ====  ==  ==  =====    =====  =======  =======  ====  =  ====  =  ====  =
// ====  ====  ====  ==  ==  ======   ======  ===  =  =======  ====  =  ====  =  ====  =
// ====  ====  ====  =    =  =======  =======     ==        =  ====  ==      ===      ==
// =====================================================================================

function Rhombus_Tile(x, y, rot) {
    this.center = [x, y];


    this.outer = false;
    this.rotation = rot;
    this.type = 'thin';

    this.A = new Point(-side * Math.cos(Math.PI / 8), 0);
    this.B = new Point(0, side * Math.sin(Math.PI / 8));
    this.C = new Point(side * Math.cos(Math.PI / 8), 0);
    this.D = new Point(0, -side * Math.sin(Math.PI / 8));

    this.vert = [];
    this.vert[0] = this.A;
    this.vert[1] = this.B;
    this.vert[2] = this.C;
    this.vert[3] = this.D;

    for (var i = 0; i < 4; i++) {
        this.vert[i] = this.vert[i].rotate(-rot, [0, 0]);

        this.vert[i] += [x, y];
        // console.log(this.vert[i]);
    }


    // this.ab = [new Point(-side * Math.cos(alpha), 0), new Point(0, side * Math.sin(alpha))];
    // this.bc = [new Point(0, side * Math.sin(alpha)), new Point(side * Math.cos(alpha), 0)];
    // this.cd = [new Point(side * Math.cos(alpha), 0), new Point(0, -side * Math.sin(alpha))];
    // this.da = [new Point(0, -side * Math.sin(alpha)), new Point(-side * Math.cos(alpha), 0)];

    this.ab = this.vert[1] - this.vert[0];
    this.bc = this.vert[2] - this.vert[1];
    this.cd = this.vert[3] - this.vert[2];
    this.da = this.vert[0] - this.vert[3];
    // this.C /0

    // var decoration_red = new Path.Arc(this.A + this.ab, this.A+[10,0], this.A - this.da);


    // this.decoration_blue = new Path.Arc(this.vert[1] - this.ab / 3, this.vert[1] - this.ab / 4 + this.bc / 4, this.vert[1] + this.bc / 3);
    this.decoration_1 = new Path.Arc(this.vert[0] + this.ab / 3 + this.ab / 3, this.vert[0] + this.ab / 2.5 - this.da / 2.5, this.vert[0] - this.da / 3 - this.da / 3);
    this.decoration_1.strokeColor = 'blue';
    this.decoration_1.strokeWidth = '3';


    this.decoration_2 = new Path.Arc(this.vert[2] - this.bc / 3 - this.bc / 3, this.vert[2] - this.bc / 2.5 + this.cd / 2.5, this.vert[2] + this.cd / 3 + this.cd / 3);
    this.decoration_2.strokeColor = 'blue';
    this.decoration_2.strokeWidth = '3';

    // this.decoration_red = new Path.Arc(this.vert[3] + this.da / 4, this.vert[3] + this.da / 4 - this.cd / 4, this.vert[3] - this.cd / 4);
    // this.decoration_red.strokeColor = 'red';
    // this.decoration_red.strokeWidth = '3';

    this.edge = [];
    this.edge[0] = new Path(this.vert[0], this.vert[0] + this.ab);
    this.edge[0].vert = 'ab';
    this.edge[1] = new Path(this.vert[1], this.vert[1] + this.bc);
    this.edge[1].vert = 'bc';
    this.edge[2] = new Path(this.vert[2], this.vert[2] + this.cd);
    this.edge[2].vert = 'cd';
    this.edge[3] = new Path(this.vert[3], this.vert[3] + this.da);
    this.edge[3].vert = 'da';


    this.edge[0].vec = this.ab;
    this.edge[0].vec.type = 'double_outward_arrow';

    this.edge[1].vec = this.bc;
    this.edge[1].vec.type = 'double_inward_arrow';

    this.edge[2].vec = this.cd;
    this.edge[2].vec.type = 'single_outward_arrow';

    this.edge[3].vec = this.da;
    this.edge[3].vec.type = 'single_inward_arrow';


    this.edge[0].outer = false;
    this.edge[1].outer = false;
    this.edge[2].outer = false;
    this.edge[3].outer = false;

    // this.tile = new Path(this.vertices);
    // this.tile.fillColor = 'red';
    for (i = 0; i < 4; i++) {
        this.edge[i].strokeColor = 'black';
        this.edge[i].strokeWidth = '2';
        // this.edge[i].position += [x, y];
        // this.edge[i].rotate(rot, [x, y]);
    }


    function mark() {
        for (var i = 0; i < 4; i++) {
            this.edge[i].strokeColor = 'pink';
            this.edge[i].strokeWidth = '6';

        }
    }

    // this.edge[0].strokeColor = 'blue';
    // this.edge[1].strokeColor = 'black';
    // this.edge[2].strokeColor = 'green';
    // this.edge[3].strokeColor = 'red';

    // var myCircle = new Path.Circle(this.vert[1], 20);
    // myCircle.fillColor = 'black';
}

// #############################################################################################################
// #############################################################################################################


// #############################################################################################################
// #############################################################################################################

function move_tile(tile, x, y) {
    tile.tile.position += [x, y];
    console.log('move');
}


// =================================================================================
// =       ==  ==========  ======     ==        =====        ====  ====        =====
// =  ====  =  =========    ====  ===  =  ===========  =========    ======  ========
// =  ====  =  ========  ==  ==  =======  ===========  ========  ==  =====  ========
// =  ====  =  =======  ====  =  =======  ===========  =======  ====  ====  ========
// =       ==  =======  ====  =  =======      =======      ===  ====  ====  ========
// =  =======  =======        =  =======  ===========  =======        ====  ========
// =  =======  =======  ====  =  =======  ===========  =======  ====  ====  ========
// =  =======  =======  ====  ==  ===  =  ===========  =======  ====  ====  ========
// =  =======        =  ====  ===     ==        =====  =======  ====  ====  ========
// =================================================================================


//place xtile to edge number 'num' of tile:
function place_square_by_edge(tile, num) {

    // tile.edge[num].outer = false;


    var case_need_to_rewrite = -1;
    var tempvec = new Point(0, 0);
    var centre = new Point(0, 0);
    var x1 = tile.edge[num].firstSegment.point.x;
    var y1 = tile.edge[num].firstSegment.point.y;
    var x2 = tile.edge[num].lastSegment.point.x;
    var y2 = tile.edge[num].lastSegment.point.y;
    // var start_cir = new Shape.Circle([x1, y1], 10);
    // start_cir.strokeColor = 'blue';
    // var end_cir = new Shape.Circle([x2, y2], 20);
    // end_cir.strokeColor = 'pink';



    if (tile.type == 'fat') {

        // console.log('fat');

        if (tile.edge[num].vert == 'ab') {
            // console.log('we need to fit tile with da')
            case_need_to_rewrite = 0;
        }
        if (tile.edge[num].vert == 'bc') {
            // console.log('we need to fit tile with cd')
            case_need_to_rewrite = 1;
        }
        if (tile.edge[num].vert == 'cd') {
            // console.log('we need to fit tile with bc')
            case_need_to_rewrite = 2;
        }
        if (tile.edge[num].vert == 'da') {
            // console.log('we need to fit tile with ab')
            case_need_to_rewrite = 3;
        }


        // console.log('case', case_need_to_rewrite);

        //CASE AB -- 0th case:
        if (case_need_to_rewrite === 0) {
            tempvec = tile.ab.rotate(90, [0, 0]);
            centre = tile.vert[0] + (tile.ab + tempvec) / 2;

            ytile = new Square_Tile(centre.x, centre.y, -90 + tile.rotation);

            // tile.edge[0].strokeColor = 'pink';
            // tile.edge[0].strokeWidth = 5;

        }
        //CASE BC -- 1th case:

        if (case_need_to_rewrite == 1) {
            tempvec = tile.bc.rotate(90, [0, 0]);
            // var temp_vec_path = new Path(tile.vert[1], tile.vert[1]+tempvec);
            // temp_vec_path.strokeColor = 'green';
            centre = tile.vert[1] + (tile.bc + tempvec) / 2;
            // tile.edge[1].strokeColor = 'pink';
            // tile.edge[1].strokeWidth = 5;


            ytile = new Square_Tile(centre.x, centre.y, 90 + tile.rotation);
        }


        //CASE CD -- 2th case:
        if (case_need_to_rewrite == 2) {
            tempvec = tile.cd.rotate(90, [0, 0]);
            // var temp_vec_path = new Path(tile.vert[2], tile.vert[2] + tempvec);
            // temp_vec_path.strokeColor = 'green';
            centre = tile.vert[2] + (tile.cd + tempvec) / 2;
            // tile.edge[case_need_to_rewrite].strokeColor = 'pink';
            // tile.edge[case_need_to_rewrite].strokeWidth = 5;


            ytile = new Square_Tile(centre.x, centre.y, -90 + tile.rotation);
        }

        //case DA
        if (case_need_to_rewrite == 3) {
            tempvec = tile.da.rotate(90, [0, 0]);
            // var temp_vec_path = new Path(tile.vert[3], tile.vert[3] + tempvec);
            // temp_vec_path.strokeColor = 'green';
            centre = tile.vert[3] + (tile.da + tempvec) / 2;
            // tile.edge[case_need_to_rewrite].strokeColor = 'pink';
            // tile.edge[case_need_to_rewrite].strokeWidth = 5;


            ytile = new Square_Tile(centre.x, centre.y, 90 + tile.rotation);
        }
    }


    // ===========================================================
    // ===    =====================================  =============
    // ==  ==  ====================================  =============
    // ==  ============  =======  =============  ==  =============
    // =    =====   ==    =====    ==   ======    =  ====  =  = ==
    // ==  =====  =  ==  =======  ==     ======  ==    =====     =
    // ==  ========  ==  =======  ==  =  ======  ==  =  =  =  =  =
    // ==  ======    ==  =======  ==  =  ======  ==  =  =  =  =  =
    // ==  =====  =  ==  =======  ==  =  ======  ==  =  =  =  =  =
    // ==  ======    ==   ======   ==   =======   =  =  =  =  =  =
    // ===========================================================

    if (tile.type == 'thin') {

        // console.log('i cant do it ');

        if (tile.edge[num].vert == 'ab') {
            // console.log('we need to fit tile with da')
            case_need_to_rewrite = 0;
        }
        if (tile.edge[num].vert == 'bc') {
            // console.log('we need to fit tile with cd')
            case_need_to_rewrite = 1;
        }
        if (tile.edge[num].vert == 'cd') {
            // console.log('we need to fit tile with bc')
            case_need_to_rewrite = 2;
        }
        if (tile.edge[num].vert == 'da') {
            // console.log('we need to fit tile with ab')
            case_need_to_rewrite = 3;
        }


        //CASE AB -- 0th case:
        if (case_need_to_rewrite === 0) {
            tempvec = tile.ab.rotate(90, [0, 0]);
            centre = tile.vert[0] + (tile.ab + tempvec) / 2;

            // var temp_vec_path = new Path(tile.vert[0], tile.vert[0] + tempvec);
            // temp_vec_path.strokeColor = 'green';
            // tile.edge[0].strokeColor = 'pink';
            // tile.edge[case_need_to_rewrite].strokeWidth = 6;


            ytile = new Square_Tile(centre.x, centre.y, 22.5 + 90 + tile.rotation);
        }
        //CASE BC -- 1th case:

        if (case_need_to_rewrite == 1) {
            tempvec = tile.bc.rotate(90, [0, 0]);
            centre = tile.vert[1] + (tile.bc + tempvec) / 2;

            // var temp_vec_path = new Path(tile.vert[1], tile.vert[1]+tempvec);
            // temp_vec_path.strokeColor = 'green';
            // tile.edge[1].strokeColor = 'pink';
            // tile.edge[case_need_to_rewrite].strokeWidth = 6;

            ytile = new Square_Tile(centre.x, centre.y, -90 - 90 - 90 - 22.5 + tile.rotation);
        }


        //CASE CD -- 2th case:
        if (case_need_to_rewrite == 2) {
            tempvec = tile.cd.rotate(90, [0, 0]);
            centre = tile.vert[2] + (tile.cd + tempvec) / 2;

            // var temp_vec_path = new Path(tile.vert[2], tile.vert[2] + tempvec);
            // temp_vec_path.strokeColor = 'green';
            // tile.edge[2].strokeColor = 'pink';
            // tile.edge[case_need_to_rewrite].strokeWidth = 6;


            ytile = new Square_Tile(centre.x, centre.y, -90 + 22.5 + tile.rotation);
        }

        //case DA
        if (case_need_to_rewrite == 3) {
            tempvec = tile.da.rotate(90, [0, 0]);
            centre = tile.vert[3] + (tile.da + tempvec) / 2;

            // var temp_vec_path = new Path(tile.vert[3], tile.vert[3] + tempvec);
            // temp_vec_path.strokeColor = 'green';
            // tile.edge[3].strokeColor = 'pink';
            // tile.edge[case_need_to_rewrite].strokeWidth = 6;

            ytile = new Square_Tile(centre.x, centre.y, 90 + 90 + 90 - 22.5 + tile.rotation);
        }
    }


    return ytile;

}

function place_square_by_edge2(tile, num) {

    // tile.edge[num].outer = false;


    var case_need_to_rewrite = -1;
    var tempvec = new Point(0, 0);
    var centre = new Point(0, 0);
    var x1 = tile.edge[num].firstSegment.point.x;
    var y1 = tile.edge[num].firstSegment.point.y;
    var x2 = tile.edge[num].lastSegment.point.x;
    var y2 = tile.edge[num].lastSegment.point.y;
    // var start_cir = new Shape.Circle([x1, y1], 10);
    // start_cir.strokeColor = 'blue';
    // var end_cir = new Shape.Circle([x2, y2], 20);
    // end_cir.strokeColor = 'pink';



    if (tile.type == 'fat') {
        console.error('place_square_by_edge2');
    }


    // ===========================================================
    // ===    =====================================  =============
    // ==  ==  ====================================  =============
    // ==  ============  =======  =============  ==  =============
    // =    =====   ==    =====    ==   ======    =  ====  =  = ==
    // ==  =====  =  ==  =======  ==     ======  ==    =====     =
    // ==  ========  ==  =======  ==  =  ======  ==  =  =  =  =  =
    // ==  ======    ==  =======  ==  =  ======  ==  =  =  =  =  =
    // ==  =====  =  ==  =======  ==  =  ======  ==  =  =  =  =  =
    // ==  ======    ==   ======   ==   =======   =  =  =  =  =  =
    // ===========================================================

    if (tile.type == 'thin') {

        // console.log('i cant do it ');

        if (tile.edge[num].vert == 'ab') {
            // console.log('we need to fit tile with da')
            case_need_to_rewrite = 0;
        }
        if (tile.edge[num].vert == 'bc') {
            // console.log('we need to fit tile with cd')
            case_need_to_rewrite = 1;
        }
        if (tile.edge[num].vert == 'cd') {
            // console.log('we need to fit tile with bc')
            case_need_to_rewrite = 2;
        }
        if (tile.edge[num].vert == 'da') {
            // console.log('we need to fit tile with ab')
            case_need_to_rewrite = 3;
        }


        //CASE AB -- 0th case:
        if (case_need_to_rewrite === 0) {
            tempvec = tile.ab.rotate(90, [0, 0]);
            centre = tile.vert[0] + (tile.ab + tempvec) / 2;

            // var temp_vec_path = new Path(tile.vert[0], tile.vert[0] + tempvec);
            // temp_vec_path.strokeColor = 'green';
            // tile.edge[0].strokeColor = 'pink';
            // tile.edge[case_need_to_rewrite].strokeWidth = 6;


            ytile = new Square_Tile(centre.x, centre.y, 22.5 + 90 + 90 + tile.rotation);
        }
        //CASE BC -- 1th case:

        if (case_need_to_rewrite == 1) {
            tempvec = tile.bc.rotate(90, [0, 0]);
            centre = tile.vert[1] + (tile.bc + tempvec) / 2;

            // var temp_vec_path = new Path(tile.vert[1], tile.vert[1]+tempvec);
            // temp_vec_path.strokeColor = 'green';
            // tile.edge[1].strokeColor = 'pink';
            // tile.edge[case_need_to_rewrite].strokeWidth = 6;

            ytile = new Square_Tile(centre.x, centre.y, -90 - 90 - 90 - 90 - 22.5 + tile.rotation);
        }


        //CASE CD -- 2th case:
        if (case_need_to_rewrite == 2) {
            tempvec = tile.cd.rotate(90, [0, 0]);
            centre = tile.vert[2] + (tile.cd + tempvec) / 2;

            // var temp_vec_path = new Path(tile.vert[2], tile.vert[2] + tempvec);
            // temp_vec_path.strokeColor = 'green';
            // tile.edge[2].strokeColor = 'pink';
            // tile.edge[case_need_to_rewrite].strokeWidth = 6;


            ytile = new Square_Tile(centre.x, centre.y, 90 - 90 + 22.5 + tile.rotation);
        }

        //case DA
        if (case_need_to_rewrite == 3) {
            tempvec = tile.da.rotate(90, [0, 0]);
            centre = tile.vert[3] + (tile.da + tempvec) / 2;

            // var temp_vec_path = new Path(tile.vert[3], tile.vert[3] + tempvec);
            // temp_vec_path.strokeColor = 'green';
            // tile.edge[3].strokeColor = 'pink';
            // tile.edge[case_need_to_rewrite].strokeWidth = 6;

            ytile = new Square_Tile(centre.x, centre.y, 90 + 90 - 22.5 + tile.rotation);
        }
    }


    return ytile;

}


// =====================================================================================
// =       ==  ==========  ======     ==        =====        =  ====  =    =  =======  =
// =  ====  =  =========    ====  ===  =  ==============  ====  ====  ==  ==   ======  =
// =  ====  =  ========  ==  ==  =======  ==============  ====  ====  ==  ==    =====  =
// =  ====  =  =======  ====  =  =======  ==============  ====  ====  ==  ==  ==  ===  =
// =       ==  =======  ====  =  =======      ==========  ====        ==  ==  ===  ==  =
// =  =======  =======        =  =======  ==============  ====  ====  ==  ==  ====  =  =
// =  =======  =======  ====  =  =======  ==============  ====  ====  ==  ==  =====    =
// =  =======  =======  ====  ==  ===  =  ==============  ====  ====  ==  ==  ======   =
// =  =======        =  ====  ===     ==        ========  ====  ====  =    =  =======  =
// =====================================================================================


//place xtile to edge number 'num' of given tile:
function place_rhombus_by_edge(tile, num) {

    // tile.edge[num].outer = false;

    var case_need_to_rewrite = -1;
    var tempvec = new Point(0, 0);
    var centre = new Point(0, 0);
    var x1 = tile.edge[num].firstSegment.point.x;
    var y1 = tile.edge[num].firstSegment.point.y;
    var x2 = tile.edge[num].lastSegment.point.x;
    var y2 = tile.edge[num].lastSegment.point.y;
    //is it outer?

    // var start_cir = new Shape.Circle([x1, y1], 10);
    // start_cir.strokeColor = 'blue';
    // var end_cir = new Shape.Circle([x2, y2], 20);
    // end_cir.strokeColor = 'pink';


    // ===========================================================
    // ======  ==================================    =============
    // ======  =================================  ==  ============
    // ==  ==  ==================  =============  ============  ==
    // =    =  ====  =  = ======    ==   ======    =====   ==    =
    // ==  ==    =====     ======  ==     ======  =====  =  ==  ==
    // ==  ==  =  =  =  =  ======  ==  =  ======  ========  ==  ==
    // ==  ==  =  =  =  =  ======  ==  =  ======  ======    ==  ==
    // ==  ==  =  =  =  =  ======  ==  =  ======  =====  =  ==  ==
    // ==   =  =  =  =  =  ======   ==   =======  ======    ==   =
    // ===========================================================

    if (tile.type == 'fat') {
        if (tile.edge[num].vert == 'ab') {

            case_need_to_rewrite = 0;
        }
        if (tile.edge[num].vert == 'bc') {

            case_need_to_rewrite = 1;
        }
        if (tile.edge[num].vert == 'cd') {

            case_need_to_rewrite = 2;
        }
        if (tile.edge[num].vert == 'da') {

            case_need_to_rewrite = 3;
        }

        //CASE AB -- 0th case:
        if (case_need_to_rewrite === 0) {
            tempvec = tile.ab.rotate(135, [0, 0]);
            centre = tile.vert[0] + (tile.ab + tempvec) / 2;

            // tile.edge[0].strokeColor = 'pink';
            // var temp_vec_path = new Path(tile.vert[0], tile.vert[0]+tempvec);
            // temp_vec_path.strokeColor = 'green';


            ytile = new Rhombus_Tile(centre.x, centre.y, -22.5 + tile.rotation);
        }

        //CASE BC -- 1th case:
        if (case_need_to_rewrite == 1) {
            tempvec = tile.bc.rotate(135, [0, 0]);
            centre = tile.vert[1] + (tile.bc + tempvec) / 2;

            // var temp_vec_path = new Path(tile.veLrt[1], tile.vert[1] + tempvec);
            // // temp_vec_path.strokeColor = 'green';
            // tile.edge[1].strokeColor = 'pink';

            ytile = new Rhombus_Tile(centre.x, centre.y, 45 + 22.5 + tile.rotation);
        }

        //CASE CD -- 2th case:
        if (case_need_to_rewrite == 2) {
            tempvec = tile.cd.rotate(45, [0, 0]);
            // var temp_vec_path = new Path(tile.vert[2], tile.vert[2] + tempvec);
            // temp_vec_path.strokeColor = 'green';
            centre = tile.vert[2] + (tile.cd + tempvec) / 2;
            // tile.edge[2].strokeColor = 'pink';

            ytile = new Rhombus_Tile(centre.x, centre.y, -45 + 90 + 90 - 22.5 + tile.rotation);
        }

        //case DA
        if (case_need_to_rewrite == 3) {
            tempvec = tile.da.rotate(45, [0, 0]);
            // var temp_vec_path = new Path(tile.vert[3], tile.vert[3] + tempvec);
            // temp_vec_path.strokeColor = 'green';
            centre = tile.vert[3] + (tile.da + tempvec) / 2;
            // tile.edge[3].strokeColor = 'pink';

            ytile = new Rhombus_Tile(centre.x, centre.y, 22.5 + tile.rotation);
        }
    }

    //
    // ============================================================
    // ======  =====================================  =============
    // ======  =====================================  =============
    // ==  ==  ==================  =============  ==  =============
    // =    =  ====  =  = ======    ==   ======    =  ====  =  = ==
    // ==  ==    =====     ======  ==     ======  ==    =====     =
    // ==  ==  =  =  =  =  ======  ==  =  ======  ==  =  =  =  =  =
    // ==  ==  =  =  =  =  ======  ==  =  ======  ==  =  =  =  =  =
    // ==  ==  =  =  =  =  ======  ==  =  ======  ==  =  =  =  =  =
    // ==   =  =  =  =  =  ======   ==   =======   =  =  =  =  =  =
    // ============================================================

    if (tile.type == 'thin') {
        if (tile.edge[num].vert == 'ab') {

            case_need_to_rewrite = 0;
        }
        if (tile.edge[num].vert == 'bc') {

            case_need_to_rewrite = 1;
        }
        if (tile.edge[num].vert == 'cd') {

            case_need_to_rewrite = 2;
        }
        if (tile.edge[num].vert == 'da') {

            case_need_to_rewrite = 3;
        }

        //CASE AB -- 0th case:
        if (case_need_to_rewrite === 0) {
            tempvec = tile.ab.rotate(45, [0, 0]);
            // var temp_vec_path = new Path(tile.vert[0], tile.vert[0]+tempvec);
            // temp_vec_path.strokeColor = 'green';
            centre = tile.vert[0] + (tile.ab + tempvec) / 2;

            tile.edge[0].strokeColor = 'pink';


            ytile = new Rhombus_Tile(centre.x, centre.y, -45 + tile.rotation);
        }

        //CASE BC -- 1th case:
        if (case_need_to_rewrite == 1) {
            tempvec = tile.bc.rotate(135, [0, 0]);
            // var temp_vec_path = new Path(tile.vert[1], tile.vert[1]+tempvec);
            // temp_vec_path.strokeColor = 'green';
            centre = tile.vert[1] + (tile.bc + tempvec) / 2;
            tile.edge[1].strokeColor = 'pink';

            ytile = new Rhombus_Tile(centre.x, centre.y, -90 - 45 + tile.rotation);
        }

        //CASE CD -- 2th case:
        if (case_need_to_rewrite == 2) {
            tempvec = tile.cd.rotate(45, [0, 0]);
            // var temp_vec_path = new Path(tile.vert[2], tile.vert[2] + tempvec);
            // temp_vec_path.strokeColor = 'green';
            centre = tile.vert[2] + (tile.cd + tempvec) / 2;
            tile.edge[2].strokeColor = 'pink';

            ytile = new Rhombus_Tile(centre.x, centre.y, -45 + tile.rotation);
        }

        //case DA
        if (case_need_to_rewrite == 3) {
            tempvec = tile.da.rotate(135, [0, 0]);
            // var temp_vec_path = new Path(tile.vert[3], tile.vert[3] + tempvec);
            // temp_vec_path.strokeColor = 'green';
            centre = tile.vert[3] + (tile.da + tempvec) / 2;
            tile.edge[3].strokeColor = 'pink';

            ytile = new Rhombus_Tile(centre.x, centre.y, 45 + tile.rotation);
        }
    }
    return ytile;

}


// =================================================================================================
// =        =    =  =======  =       ======  =======  =        ====  ====       ==      ===  ====  =
// =  ========  ==   ======  =  ====  =====   ======  =  =========    ===  ====  =  ===  ==   ==   =
// =  ========  ==    =====  =  ====  =====    =====  =  ========  ==  ==  ====  =  ====  ==  ==  ==
// =  ========  ==  ==  ===  =  ====  =====  ==  ===  =  =======  ====  =  ===   =  ===  ===  ==  ==
// =      ====  ==  ===  ==  =  ====  =====  ===  ==  =      ===  ====  =      ===      =====    ===
// =  ========  ==  ====  =  =  ====  =====  ====  =  =  =======        =  ====  =  ===  =====  ====
// =  ========  ==  =====    =  ====  =====  =====    =  =======  ====  =  ====  =  ====  ====  ====
// =  ========  ==  ======   =  ====  =====  ======   =  =======  ====  =  ====  =  ===  =====  ====
// =  =======    =  =======  =       ======  =======  =        =  ====  =  ====  =      ======  ====
// =================================================================================================
// var myCircle = new Path.Circle([0,0], 7);
//find tiles with this vert



//nearby_edges_as_vectors also here
function find_tiles_w_that_vertice(vertice, sometiles) {
    nearby_tiles = [];
    nearby_edges_as_vectors = [];
    nearby_vert = [];
    var epsilon = 0.0001;
    var count = 0;
    edges_count = 0;

    // console.log('sometiles.length', sometiles.length);
    // console.log(vertice  - sometiles[1].vert[1]);
    // console.log(sometiles[1].vert[1]);

    // console.log((vertice.x - sometiles[i].vert[j].x < epsilon));
    // console.log((vertice.y - sometiles[i].vert[j].y < epsilon));
    // (vertice.x - sometiles[i].vert[j].x <= epsilon)

    // (vertice.y - sometiles[i].vert[j].y <= epsilon)
    for (var i = 0; i < sometiles.length; i++) {
        //j -- vertex number
        for (var j = 0; j < 4; j++) {
            if ((Math.abs(vertice.x - sometiles[i].vert[j].x) <= epsilon) &&
                (Math.abs(vertice.y - sometiles[i].vert[j].y) <= epsilon)) {


                nearby_tiles[count] = sometiles[i];
                count++;

                if (j > 0) {
                    nearby_edges_as_vectors.push(sometiles[i].edge[j].vec);
                    // nearby_edges_as_vectors.push(sometiles[i].edge[j - 1].vec * (-1)); //not working
                    nearby_edges_as_vectors.push(reverse_vec(sometiles[i].edge[j - 1].vec));

                    edges_count += 2;
                }
                if (j === 0) {
                    nearby_edges_as_vectors.push(sometiles[i].edge[0].vec);
                    // nearby_edges_as_vectors.push(sometiles[i].edge[3].vec * (-1));  //not WORKING
                    nearby_edges_as_vectors.push(reverse_vec(sometiles[i].edge[3].vec));

                    edges_count += 2;
                }



                // console.log('.x -.x ', vertice.x - sometiles[i].vert[j].x);
                // console.log('.y - sometiles[i].vert[j].y ', vertice.y - sometiles[i].vert[j].y);
                // console.log('i ', i);
                // console.log('j ', j);
                // console.log('count', count);

                // break;

            }
        }
    }
    // for (var i = 0; i < sometiles.length; i++) {
    //     for (var j = 0; j < 4; j++) {
    //         if (vertice == sometiles[i].vert[j]) {
    //             nearby[count] = sometiles[i];
    //             count++;
    //         }
    //     }
    // }
    // console.log('count = ', count);
    //  myCircle = new Path.Circle(vertice, 7);
    // myCircle.strokeColor = 'green';

}



// =  =====  ====  ====       ==  ====  =====       ==    =  =======  =  ====  =
// =   ===   ===    ===  ====  =  ===  ======  ====  ==  ==   ======  =  ===  ==
// =  =   =  ==  ==  ==  ====  =  ==  =======  ====  ==  ==    =====  =  ==  ===
// =  == ==  =  ====  =  ===   =  =  ========  ====  ==  ==  ==  ===  =  =  ====
// =  =====  =  ====  =      ===     ========       ===  ==  ===  ==  =     ====
// =  =====  =        =  ====  =  ==  =======  ========  ==  ====  =  =  ==  ===
// =  =====  =  ====  =  ====  =  ===  ======  ========  ==  =====    =  ===  ==
// =  =====  =  ====  =  ====  =  ====  =====  ========  ==  ======   =  ====  =
// =  =====  =  ====  =  ====  =  ====  =====  =======    =  =======  =  ====  =
// =============================================================================

function mark_tiles(tiles) {
    for (var i = 0; i < tiles.length; i++) {
        for (var j = 0; j < 4; j++) {
            tiles[i].edge[j].strokeColor = 'pink';
            tiles[i].edge[j].strokeWidth = '4';
        }
    }
}

// =  =====  ====  ====       ==  ====  =====        =       ===      ==        ==      ==
// =   ===   ===    ===  ====  =  ===  ======  =======  ====  =   ==   =  =======  ====  =
// =  =   =  ==  ==  ==  ====  =  ==  =======  =======  ====  =  ====  =  =======  ====  =
// =  == ==  =  ====  =  ===   =  =  ========  =======  ====  =  =======  ========  ======
// =  =====  =  ====  =      ===     ========      ===  ====  =  =======      ======  ====
// =  =====  =        =  ====  =  ==  =======  =======  ====  =  ===   =  ============  ==
// =  =====  =  ====  =  ====  =  ===  ======  =======  ====  =  ====  =  =======  ====  =
// =  =====  =  ====  =  ====  =  ====  =====  =======  ====  =   ==   =  =======  ====  =
// =  =====  =  ====  =  ====  =  ====  =====        =       ===      ==        ==      ==
// =======================================================================================

function mark_edges(some_edges) {

    for (var i = 0; i < some_edges.length; i++) {
        some_edges[i].strokeColor = 'purple';
        some_edges[i].strokeWidth = '4';
    }
}


// ==================================================================================================
// ==      ==        =        =====       =====  ====        =        =        =       ==  =======  =
// =   ==   =  ==========  ========  ====  ===    ======  =======  ====  =======  ====  =   ======  =
// =  ====  =  ==========  ========  ====  ==  ==  =====  =======  ====  =======  ====  =    =====  =
// =  =======  ==========  ========  ====  =  ====  ====  =======  ====  =======  ===   =  ==  ===  =
// =  =======      ======  ========       ==  ====  ====  =======  ====      ===      ===  ===  ==  =
// =  ===   =  ==========  ========  =======        ====  =======  ====  =======  ====  =  ====  =  =
// =  ====  =  ==========  ========  =======  ====  ====  =======  ====  =======  ====  =  =====    =
// =   ==   =  ==========  ========  =======  ====  ====  =======  ====  =======  ====  =  ======   =
// ==      ==        ====  ========  =======  ====  ====  =======  ====        =  ====  =  =======  =
// ==================================================================================================
// function get_pattern(vec) {
//
//     console.log('get pattern yo');
//
//     pattern = [];
//     for (var i = 0; i < vec.length; i++) {
//         console.log(i, '-th angle ', vec[i].angle);
//     }
//
//
//
// }
//
// ===============================================================================================
// ==      ====     =====  ====  ==========  ====       ======       ==       ====    ===       ==
// =  ====  ==  ===  ===    ===  =========    ===  ====  =====  ====  =  ====  ==  ==  ==  ====  =
// =  ====  =  ========  ==  ==  ========  ==  ==  ====  =====  ====  =  ====  =  ====  =  ====  =
// ==  ======  =======  ====  =  =======  ====  =  ===   =====  ====  =  ===   =  ====  =  ====  =
// ====  ====  =======  ====  =  =======  ====  =      =======       ==      ===  ====  =  ====  =
// ======  ==  =======        =  =======        =  ====  =====  =======  ====  =  ====  =  ====  =
// =  ====  =  =======  ====  =  =======  ====  =  ====  =====  =======  ====  =  ====  =  ====  =
// =  ====  ==  ===  =  ====  =  =======  ====  =  ====  =====  =======  ====  ==  ==  ==  ====  =
// ==      ====     ==  ====  =        =  ====  =  ====  =====  =======  ====  ===    ===       ==
// ===============================================================================================
function scalar_product(vec1, vec2) {
    return vec1.x * vec2.x + vec1.y * vec2.y;
}


//векторы нормированные
function is_collinear(vec1, vec2) {
    var temp = vec1.x * vec2.y - vec1.y * vec2.x;
    return Math.abs(temp);
}

// ================================================================================================
// ==      ==        =        =====  ====  =  =======  ======     ======  ====  =        ===     ==
// =   ==   =  ==========  ========  ====  =   ======  =====  ===  =====  ====  =  ========  ===  =
// =  ====  =  ==========  ========  ====  =    =====  ====  ===========  ====  =  =======  =======
// =  =======  ==========  ========  ====  =  ==  ===  =  =  ===========  ====  =  =======  =======
// =  =======      ======  ========  ====  =  ===  ==  ====  ===========   ==   =      ===  =======
// =  ===   =  ==========  ========  ====  =  ====  =  =  =  ============  ==  ==  =======  =======
// =  ====  =  ==========  ========  ====  =  =====    =  =  ============  ==  ==  =======  =======
// =   ==   =  ==========  ========   ==   =  ======   =  ==  ===  =======    ===  ========  ===  =
// ==      ==        ====  =========      ==  =======  =  ===     =========  ====        ===     ==
// ================================================================================================
function get_unic_vec(vectors) {
    var epsilon = 0.001;
    // console.log('get_unic_vec');
    unique_edges_as_vectors = [];
    unique_edges_as_vectors[0] = nearby_edges_as_vectors[0];

    for (var i = 1; i < nearby_edges_as_vectors.length; i++) {
        if (already_in_uniques(nearby_edges_as_vectors[i]) === 0) {
            unique_edges_as_vectors.push(nearby_edges_as_vectors[i]);
        }
        // console.log('i', i);

    }

    function already_in_uniques(edge_as_vec) {

        for (var j = 0; j < unique_edges_as_vectors.length; j++) {
            // console.log('j', j);
            if (vectors_are_equal(edge_as_vec, unique_edges_as_vectors[j])) {
                // console.log('ravno');
                // console.log(unique_edges_as_vectors[j].vec);
                // console.log(edge.vec);
                // console.log(edge.vec - unique_edges_as_vectors[j].vec);

                if (edge_as_vec.type == unique_edges_as_vectors[j].type) {

                    return 1;

                    //
                } else {
                    // console.log('place2 arrows mismatch');
                    // console.log('mismatch', edge_as_vec.type);
                    // console.log('mismatch', unique_edges_as_vectors[j].type);
                }

                // return 1;
            }

        }
        return 0;

        // console.log("unique_edges_as_vectors", unique_edges_as_vectors.length);
        // console.log("unique_edges_as_vectors", unique_edges_as_vectors);
    }
}

//
// ===========================================================================================================
// =       ==  =========    ===        =====       =====  ====        =        =        =       ==  =======  =
// =  ====  =  ========  ==  =====  ========  ====  ===    ======  =======  ====  =======  ====  =   ======  =
// =  ====  =  =======  ====  ====  ========  ====  ==  ==  =====  =======  ====  =======  ====  =    =====  =
// =  ====  =  =======  ====  ====  ========  ====  =  ====  ====  =======  ====  =======  ===   =  ==  ===  =
// =       ==  =======  ====  ====  ========       ==  ====  ====  =======  ====      ===      ===  ===  ==  =
// =  =======  =======  ====  ====  ========  =======        ====  =======  ====  =======  ====  =  ====  =  =
// =  =======  =======  ====  ====  ========  =======  ====  ====  =======  ====  =======  ====  =  =====    =
// =  =======  ========  ==  =====  ========  =======  ====  ====  =======  ====  =======  ====  =  ======   =
// =  =======        ===    ======  ========  =======  ====  ====  =======  ====        =  ====  =  =======  =
// ===========================================================================================================

function plot_pattern(vectors, x, y) {
    // console.log("plooooot_pattern");
    // console.log(vectors[0].type);


    // console.log("plooooot_pattern");

    // console.log(vectors);


    // for(var i = 0; i < vectors.length; i++)
    // {
    // 		if(isNaN(vectors[0].type )){
    // 			console.log('nan is ok');
    // 		}
    // 	}

    pattern_plot = [];
    var center = new Point(paper.view.center.x * x, paper.view.center.y * y);

    // console.log('center', center);


    // single arrow - red
    // double arrow - blue
    for (var i = 0; i < vectors.length; i++) {
        pattern_plot[i] = new Path(center, center + vectors[i]);

        pattern_plot[i].strokeColor = 'green';


        pattern_plot[i].strokeWidth = '3';
        pattern_plot[i].strokeColor = 'black';
        // console.log('pattern_plot type');
        // console.log(pattern_plot.type);
        if (vectors[i].type == 'single_outward_arrow') {
            pattern_plot[i].strokeColor = 'Brown 	';
        }

        if (vectors[i].type == 'single_inward_arrow') {
            pattern_plot[i].strokeColor = 'Tomato 	';
        }

        if (vectors[i].type == 'double_outward_arrow') {
            pattern_plot[i].strokeColor = 'DarkBlue';
        }

        if (vectors[i].type == 'double_inward_arrow') {
            pattern_plot[i].strokeColor = 'SkyBlue 	';
        }

    }

    // console.log('plot pattern');

}


// ========================================================================================================
// ==      ====    ===       ==        =====  ====  =        ===     ==        ===    ===       ===      ==
// =  ====  ==  ==  ==  ====  ====  ========  ====  =  ========  ===  ====  =====  ==  ==  ====  =  ====  =
// =  ====  =  ====  =  ====  ====  ========  ====  =  =======  ==========  ====  ====  =  ====  =  ====  =
// ==  ======  ====  =  ===   ====  ========  ====  =  =======  ==========  ====  ====  =  ===   ==  ======
// ====  ====  ====  =      ======  ========   ==   =      ===  ==========  ====  ====  =      ======  ====
// ======  ==  ====  =  ====  ====  =========  ==  ==  =======  ==========  ====  ====  =  ====  ======  ==
// =  ====  =  ====  =  ====  ====  =========  ==  ==  =======  ==========  ====  ====  =  ====  =  ====  =
// =  ====  ==  ==  ==  ====  ====  ==========    ===  ========  ===  ====  =====  ==  ==  ====  =  ====  =
// ==      ====    ===  ====  ====  ===========  ====        ===     =====  ======    ===  ====  ==      ==
// ========================================================================================================

function sort_vec(vectors) {
    var x = 0;
    var j = 0;
    for (var i = 1; i < vectors.length; i++) {
        x = vectors[i];
        j = i - 1;
        while ((j >= 0) && (vectors[j].angle > x.angle)) {
            vectors[j + 1] = vectors[j];
            j--;
        }
        vectors[j + 1] = x;
    }

}

// ================================================================
// =       ==        =  ====  =        =       ===      ==        =
// =  ====  =  =======  ====  =  =======  ====  =  ====  =  =======
// =  ====  =  =======  ====  =  =======  ====  =  ====  =  =======
// =  ===   =  =======  ====  =  =======  ===   ==  ======  =======
// =      ===      ===   ==   =      ===      ======  ====      ===
// =  ====  =  ========  ==  ==  =======  ====  ======  ==  =======
// =  ====  =  ========  ==  ==  =======  ====  =  ====  =  =======
// =  ====  =  =========    ===  =======  ====  =  ====  =  =======
// =  ====  =        ====  ====        =  ====  ==      ==        =
// ================================================================


function reverse_vec(vector) {
    if (vector.type == 'single_outward_arrow') {
        vector = vector * (-1);
        vector.type = 'single_inward_arrow';
        return vector;

    }
    if (vector.type == 'single_inward_arrow') {
        vector = vector * (-1);
        vector.type = 'single_outward_arrow';
        return vector;

    }
    if (vector.type == 'double_outward_arrow') {
        vector = vector * (-1);
        vector.type = 'double_inward_arrow';
        return vector;

    }
    if (vector.type == 'double_inward_arrow') {
        vector = vector * (-1);
        vector.type = 'double_outward_arrow';
        return vector;

    }
}

// FIXME: bad name
// ==========================================================================================================
// =    ==      ======    =        ========  ====  =======  =========    ===  ====  ====  =        =       ==
// ==  ==  ====  ======  =====  ==========    ===  =======  ========  ==  ==  ====  ====  =  =======  ====  =
// ==  ==  ====  ======  =====  =========  ==  ==  =======  =======  ====  =  ====  ====  =  =======  ====  =
// ==  ===  ===========  =====  ========  ====  =  =======  =======  ====  =  ====  ====  =  =======  ====  =
// ==  =====  =========  =====  ========  ====  =  =======  =======  ====  =   ==    ==  ==      ===  ====  =
// ==  =======  =======  =====  ========        =  =======  =======  ====  ==  ==    ==  ==  =======  ====  =
// ==  ==  ====  ======  =====  ========  ====  =  =======  =======  ====  ==  ==    ==  ==  =======  ====  =
// ==  ==  ====  ======  =====  ========  ====  =  =======  ========  ==  ====    ==    ===  =======  ====  =
// =    ==      ======    ====  ========  ====  =        =        ===    ======  ====  ====        =       ==
// ==========================================================================================================




//получаем сет векторов и смотрим включен ли он в допустимые


function is_it_allowed(vec) {

    vec_temp = [];
    // console.log('#############################>>>>>>>>>  IS IT ALLOWED AARHH? <<<<<<<<################################');
    // console.log('vec0 check', vec[0].type);
    // console.log(allowed_pattern[1]);
    // console.log(vec);
    // console.log('arrows:');
    // for (var i = 0; i < vec.length; i++) {
    // console.log(vec[i].type);
    // }


    // console.log('qq', vec[0].type);
    // vec[0] = vec[0] * (-1);
    // console.log('qqq', vec[0].type);

    for (i = 0; i < allowed_pattern.length; i++) {
        // console.log('max i', allowed_pattern.length);
        // console.log('############################>>>>>>>>> i', i);
        for (j = 0; j < allowed_pattern[i].length; j++) {
            // console.log('rotating, j', j);
            vec_temp = rotate_and_match(vec, allowed_pattern[i][j].angle);
            // console.log('yo',vec[0].type); //стрелки переносит, нормик
            // console.log(vec_temp[0].type);
            if (patterns_are_equal(vec_temp, i)) {
                // console.log('ALLOWED, patter num', i);
                // console.log('rotation num', j);

                // plot_pattern(vec_temp, 1.7, 1.3);
                // plot_pattern(allowed_pattern[i], 1.9, 1.3);




                return 1;

            }
        }
    }

    // console.log('NOT ALLOWED');
    // console.log('is it allowed has ended');
    return 0;
}



/////////////////
/////////////////
function rotate_and_match(vect, angle) {
    this.vec = [];
    angle = angle - vect[0].angle;
    for (var i = 0; i < vect.length; i++) {
        // console.log('vec angle old', vec[0]);
        // vec[i] = vec[i].rotate(angle - vec[0].angle, [0,0]);
        vec[i] = vect[i].rotate(angle, [0, 0]);
        vec[i].type = vect[i].type;
    }
    return vec;
}


/////////////////
/////////////////



function patterns_are_equal(vec, n) {
    var count = 0;
    for (var i = 0; i < vec.length; i++) {
        // console.log('patterns_are_equal i', i);
        for (var j = 0; j < allowed_pattern[n].length; j++) {
            // console.log('patterns_are_equal j', j);
            // console.log(vec[i].type);
            // console.log(allowed_pattern[n][j].type);
            if (
                (vectors_are_equal(vec[i], allowed_pattern[n][j])) &&
                (vec[i].type == allowed_pattern[n][j].type)

            ) {

                count++;
                // console.log("count", count);
                // console.log(vec[i], allowed_pattern[n][j]);
                break;

            }
        }
    }
    // console.log(vec.length, count);
    if (count == vec.length) {
        // console.log('patterns_are_equal -- TRUE');
        return 1;
    }

    // console.log('patterns_are_equal -- FALSE');
    return 0;

    // console.log('error');
}

function vectors_are_equal(vec1, vec2) {

    if ((Math.abs(vec1.x - vec2.x) < epsilon) &&
        (Math.abs(vec1.y - vec2.y) < epsilon)) {

        // console.log('vectors_are_equal -- TRUE');
        // console.log(vec1.x - vec2.x, vec1.y - vec2.y);
        return 1;
    } else {

        // console.log('vectors_are_equal -- FALSE');
        return 0;
    }

}
//
// ==============================================================================================================================
// ==      ==        =        =======    ===  ====  =        =        =       ======        =       ===      ==        ==      ==
// =   ==   =  ==========  =========  ==  ==  ====  ====  ====  =======  ====  =====  =======  ====  =   ==   =  =======  ====  =
// =  ====  =  ==========  ========  ====  =  ====  ====  ====  =======  ====  =====  =======  ====  =  ====  =  =======  ====  =
// =  =======  ==========  ========  ====  =  ====  ====  ====  =======  ===   =====  =======  ====  =  =======  ========  ======
// =  =======      ======  ========  ====  =  ====  ====  ====      ===      =======      ===  ====  =  =======      ======  ====
// =  ===   =  ==========  ========  ====  =  ====  ====  ====  =======  ====  =====  =======  ====  =  ===   =  ============  ==
// =  ====  =  ==========  ========  ====  =  ====  ====  ====  =======  ====  =====  =======  ====  =  ====  =  =======  ====  =
// =   ==   =  ==========  =========  ==  ==   ==   ====  ====  =======  ====  =====  =======  ====  =   ==   =  =======  ====  =
// ==      ==        ====  ==========    ====      =====  ====        =  ====  =====        =       ===      ==        ==      ==
// ==============================================================================================================================

function get_outer_edges(tiles) {
    outer_edges = [];
    // console.log('tiles0.edge', tiles[0].edge);
    // console.log('tiles0.edge', tiles[0].edge[3].outer);
    for (var i = 0; i < tiles.length; i++) {
        for (var j = 0; j < 4; j++) {
            if (tiles[i].edge[j].outer === true) {
                // console.log('tiles[i].edge[j].outer is true', i, j);
                outer_edges.push(tiles[i].edge[j]);
                outer_edges[outer_edges.length - 1].tilenum = i;
                outer_edges[outer_edges.length - 1].edgenum = j;
            }
        }
    }
}

//
// ============================================
// ===================================  =======
// ===================================  =======
// ============================  =====  =======
// =    ===   ==    ==========    =  =  ==   ==
// =  =  =     =  =  ==========  =====  =  =  =
// =  =  =  =  =  =  ==========  ==  =  =     =
// =    ==  =  =    ===========  ==  =  =  ====
// =  ====  =  =  =============  ==  =  =  =  =
// =  =====   ==  ====       ==   =  =  ==   ==
// ============================================

function pop_tile(tiles) {
    tilenum = [tiles.length - 1];
    for (var i = 0; i < 4; i++) {
        tiles[tilenum].edge[i].remove();
    }
    tiles[tilenum].decoration_1.remove();
    tiles[tilenum].decoration_2.remove();

    tiles.pop();
}

//
// ==================================================================================
// =    ==      ======    =        =======    ===  ====  =        =        =       ==
// ==  ==  ====  ======  =====  =========  ==  ==  ====  ====  ====  =======  ====  =
// ==  ==  ====  ======  =====  ========  ====  =  ====  ====  ====  =======  ====  =
// ==  ===  ===========  =====  ========  ====  =  ====  ====  ====  =======  ===   =
// ==  =====  =========  =====  ========  ====  =  ====  ====  ====      ===      ===
// ==  =======  =======  =====  ========  ====  =  ====  ====  ====  =======  ====  =
// ==  ==  ====  ======  =====  ========  ====  =  ====  ====  ====  =======  ====  =
// ==  ==  ====  ======  =====  =========  ==  ==   ==   ====  ====  =======  ====  =
// =    ==      ======    ====  ==========    ====      =====  ====        =  ====  =
// ==================================================================================
// ребро и множество тайлов
// хотя можно просто искать в множестве outer_edges
// если совпало с кем-нибудь, то говорим не outer
// если нет, то пишем outer
//
function is_outer(edge, outer_edges) {

    for (var i = 0; i < outer_edges.length; i++) {
        if (edges_are_equal(outer_edges[i], edge)) {
            // console.log('IS IT OUTER -- false');
            outer_edges[i].outer = false;
            return 0;
        }

    }
    // console.log('IS IT OUTER -- TRUE');
    edge.outer = true;
    return 1;


}
//
// ==============================================================================================================================
// =        =       ===      ==        ==      =========  ====       ==        =====        ==      ==  ====  ====  ====  =======
// =  =======  ====  =   ==   =  =======  ====  =======    ===  ====  =  ===========  =======  ====  =  ====  ===    ===  =======
// =  =======  ====  =  ====  =  =======  ====  ======  ==  ==  ====  =  ===========  =======  ====  =  ====  ==  ==  ==  =======
// =  =======  ====  =  =======  ========  ==========  ====  =  ===   =  ===========  =======  ====  =  ====  =  ====  =  =======
// =      ===  ====  =  =======      ======  ========  ====  =      ===      =======      ===  ====  =  ====  =  ====  =  =======
// =  =======  ====  =  ===   =  ============  ======        =  ====  =  ===========  =======  ====  =  ====  =        =  =======
// =  =======  ====  =  ====  =  =======  ====  =====  ====  =  ====  =  ===========  =======  =  =  =  ====  =  ====  =  =======
// =  =======  ====  =   ==   =  =======  ====  =====  ====  =  ====  =  ===========  =======  ==    =   ==   =  ====  =  =======
// =        =       ===      ==        ==      ======  ====  =  ====  =        =====        ==      ===      ==  ====  =        =
// ==============================================================================================================================

// check if two edges are equal
function edges_are_equal(edge1, edge2) {

    this.x1 = edge1.firstSegment.point.x;
    this.y1 = edge1.firstSegment.point.y;

    this.x2 = edge1.lastSegment.point.x;
    this.y2 = edge1.lastSegment.point.y;

    this.a1 = edge2.firstSegment.point.x;
    this.b1 = edge2.firstSegment.point.y;

    this.a2 = edge2.lastSegment.point.x;
    this.b2 = edge2.lastSegment.point.y;



    if (
        (Math.abs(this.x1 - this.a1) < epsilon) &&
        (Math.abs(this.y1 - this.b1) < epsilon) &&
        (Math.abs(this.x2 - this.a2) < epsilon) &&
        (Math.abs(this.y2 - this.b2) < epsilon)
    ) {
        // console.log('edges_are_equal -- true');
        return 1;
    }
    if (
        (Math.abs(this.x1 - this.a2) < epsilon) &&
        (Math.abs(this.y1 - this.b2) < epsilon) &&
        (Math.abs(this.x2 - this.a1) < epsilon) &&
        (Math.abs(this.y2 - this.b1) < epsilon)
    ) {
        // console.log('edges_are_equal -- true');
        return 1;
    }

    // console.log('edges_are_equal -- false');
    return 0;

}
//
// ========================================================================================================
// =  ====  =       ==       =====  ====        =        =======    ===  ====  =        =        =       ==
// =  ====  =  ====  =  ====  ===    ======  ====  ============  ==  ==  ====  ====  ====  =======  ====  =
// =  ====  =  ====  =  ====  ==  ==  =====  ====  ===========  ====  =  ====  ====  ====  =======  ====  =
// =  ====  =  ====  =  ====  =  ====  ====  ====  ===========  ====  =  ====  ====  ====  =======  ===   =
// =  ====  =       ==  ====  =  ====  ====  ====      =======  ====  =  ====  ====  ====      ===      ===
// =  ====  =  =======  ====  =        ====  ====  ===========  ====  =  ====  ====  ====  =======  ====  =
// =  ====  =  =======  ====  =  ====  ====  ====  ===========  ====  =  ====  ====  ====  =======  ====  =
// =   ==   =  =======  ====  =  ====  ====  ====  ============  ==  ==   ==   ====  ====  =======  ====  =
// ==      ==  =======       ==  ====  ====  ====        =======    ====      =====  ====        =  ====  =
// ========================================================================================================


function update_outer_propery_4_new_tile(tile, outer_edges) {

    for (var i = 0; i < 4; i++) {
        is_outer(tile.edge[i], outer_edges);
        // b_tiles[b_tiles.length - 1].edge[i].outer = true;
        // outer_edges.push(b_tiles[b_tiles.length-1].edge[i]);

    }

}

// ==========================================================================================================
// =       ==        =  =====  ===    ===  ====  =        =====  =====  ====  ====       ==  ====  ==      ==
// =  ====  =  =======   ===   ==  ==  ==  ====  =  ===========   ===   ===    ===  ====  =  ===  ==  ====  =
// =  ====  =  =======  =   =  =  ====  =  ====  =  ===========  =   =  ==  ==  ==  ====  =  ==  ===  ====  =
// =  ===   =  =======  == ==  =  ====  =  ====  =  ===========  == ==  =  ====  =  ===   =  =  =====  ======
// =      ===      ===  =====  =  ====  =   ==   =      =======  =====  =  ====  =      ===     =======  ====
// =  ====  =  =======  =====  =  ====  ==  ==  ==  ===========  =====  =        =  ====  =  ==  ========  ==
// =  ====  =  =======  =====  =  ====  ==  ==  ==  ===========  =====  =  ====  =  ====  =  ===  ==  ====  =
// =  ====  =  =======  =====  ==  ==  ====    ===  ===========  =====  =  ====  =  ====  =  ====  =  ====  =
// =  ====  =        =  =====  ===    ======  ====        =====  =====  =  ====  =  ====  =  ====  ==      ==
// ==========================================================================================================


function remove_marks() {
    for (var i = 0; i < outer_edges.length; i++) {
        outer_edges[i].strokeColor = 'black';
        outer_edges[i].strokeWidth = '2';
    }

}

function remove_all_marks() {

}

//
// ==================================================================================
// =    ==      ========    ===  ====  =        =       ==  ==========  ====       ==
// ==  ==  ====  ======  ==  ==  ====  =  =======  ====  =  =========    ===  ====  =
// ==  ==  ====  =====  ====  =  ====  =  =======  ====  =  ========  ==  ==  ====  =
// ==  ===  ==========  ====  =  ====  =  =======  ===   =  =======  ====  =  ====  =
// ==  =====  ========  ====  =   ==   =      ===      ===  =======  ====  =       ==
// ==  =======  ======  ====  ==  ==  ==  =======  ====  =  =======        =  =======
// ==  ==  ====  =====  ====  ==  ==  ==  =======  ====  =  =======  ====  =  =======
// ==  ==  ====  ======  ==  ====    ===  =======  ====  =  =======  ====  =  =======
// =    ==      ========    ======  ====        =  ====  =        =  ====  =  =======
// ==================================================================================

// check if given tile overlap with others in &tiles
function is_overlap(tile, tiles) {


    for (var k = 0; k < 4; k++) {
        for (var i = 0; i < tiles.length - 1; i++) {
            for (var j = 0; j < 4; j++) {
                // this.crossings = tile.edge[k].getCrossings(tiles[i].edge[j]);
                this.crossings = tile.edge[k].getIntersections(tiles[i].edge[j]);
                // this.crossings = tiles[i].edge[j].getCrossings(tile.edge[k]);

                var temp = 0;
                if (this.crossings.length !== 0) {

                    // console.log('cross', this.crossings);

                    // for (var l = 0; l < this.crossings.length; l++) {
                    //   var test =  new Path.Circle({
                    //         center: this.crossings[l].point,
                    //         radius: 5,
                    //         fillColor: '#009dec'
                    //
                    //     });
                    // 		// console.log('cross point', this.crossings[l].point);
                    //
                    // }

                    for (var l = 0; l < this.crossings.length; l++) {


                        // console.log('ooover', this.crossings[l].time);
                        // if ((this.crossings[l].time > 0.00001) && (this.crossings[l].time < 0.99999)) {
                        if (
                            // (vectors_are_equal(this.crossings[l].point, tile.vert[0]) === 0) &&
                            // (vectors_are_equal(this.crossings[l].point, tile.vert[1]) === 0) &&
                            // (vectors_are_equal(this.crossings[l].point, tile.vert[2]) === 0) &&
                            // (vectors_are_equal(this.crossings[l].point, tile.vert[3]) === 0) &&
                            (vectors_are_equal(this.crossings[l].point, tiles[i].vert[0]) === 0) &&
                            (vectors_are_equal(this.crossings[l].point, tiles[i].vert[1]) === 0) &&
                            (vectors_are_equal(this.crossings[l].point, tiles[i].vert[2]) === 0) &&
                            (vectors_are_equal(this.crossings[l].point, tiles[i].vert[3]) === 0)
                        ) {
                            // console.log('cross', this.crossings);
                            // console.log('cross point', this.crossings[l].point);
                            // console.log(tile.vert[0], vectors_are_equal(this.crossings[l].point, tile.vert[0]));
                            // console.log(tile.vert[1], vectors_are_equal(this.crossings[l].point, tile.vert[1]));
                            // console.log(tile.vert[2], vectors_are_equal(this.crossings[l].point, tile.vert[2]));
                            // console.log(tile.vert[3], vectors_are_equal(this.crossings[l].point, tile.vert[3]));
                            // new Path.Circle({
                            //     center: this.crossings[l].point,
                            //     radius: 5,
                            //     fillColor: '#009dec'
                            //
                            // });
                            temp++;
                            return 1;


                        }
                    }

                    // if (temp > 0) {
                    // console.log('OVERLAP');


                    // for (var l = 0; l < this.crossings.length; l++) {
                    // 		new Path.Circle({
                    // 				center: this.crossings[l].point,
                    // 				radius: 5,
                    // 				fillColor: '#009dec'
                    //
                    // 		});
                    // }
                    // return 1;
                    // }

                }



            }
        }
    }
    return 0;
    // return 0;


}

// check if given tile overlap with others in &tiles
function is_overlap2(tile, tiles) {


    for (var k = 0; k < 4; k++) { //edges of given tile
        for (var i = 0; i < tiles.length - 1; i++) { // all tiles on &tiles
            for (var j = 0; j < 4; j++) { //edges of tiles
                // this.crossings = tile.edge[k].getCrossings(tiles[i].edge[j]);
                this.crossings = tile.edge[k].getIntersections(tiles[i].edge[j]);
                // this.crossings = tiles[i].edge[j].getCrossings(tile.edge[k]);

                var temp = 0;
                if (this.crossings.length !== 0) {


                    for (var l = 0; l < this.crossings.length; l++) {


                        if (

                            (vectors_are_equal(this.crossings[l].point, tiles[i].vert[0]) === 0) &&
                            (vectors_are_equal(this.crossings[l].point, tiles[i].vert[1]) === 0) &&
                            (vectors_are_equal(this.crossings[l].point, tiles[i].vert[2]) === 0) &&
                            (vectors_are_equal(this.crossings[l].point, tiles[i].vert[3]) === 0)
                        ) {

                            temp++;
                            return 1;


                        }
                    }


                }

            }
        }
    }
    return 0;
    // return 0;


}

// =======================================================================
// =    ===      =========      ===        ==       ======  =====       ==
// ==  ===  ====  =======  ====  ==  ========  ====  ====    ====  ====  =
// ==  ===  ====  =======  ====  ==  ========  ====  ===  ==  ===  ====  =
// ==  ====  =============  =======  ========  ====  ==  ====  ==  ===   =
// ==  ======  =============  =====      ====       ===  ====  ==      ===
// ==  ========  =============  ===  ========  ========        ==  ====  =
// ==  ===  ====  =======  ====  ==  ========  ========  ====  ==  ====  =
// ==  ===  ====  =======  ====  ==  ========  ========  ====  ==  ====  =
// =    ===      =========      ===        ==  ========  ====  ==  ====  =
// =======================================================================



// //check if two tiles are not overlap
// function is_separated(tile1, tile2) {
//     //check edges of the first tile form a separation line
//
//     for (var i = 0; i < 4; i++) {
//         this.A = tile1.edge[i].vec.x;
//         this.B = tile1.edge[i].vec.y;
//
//         this.norm = dot_product(tile1.edge[i].vec, tile1.edge[i].vec);
//
//         var projections1 = [];
//         for (var j = 0; j < 4; j++) {
//             projections1.push(dot_product(tile1.edge[i].vec, tile1.vert[j]) / this.norm);
//         }
//         var projections2 = [];
//         for (j = 0; j < 4; j++) {
//             projections2.push(dot_product(tile1.edge[i].vec, tile2.vert[j]) / this.norm);
//         }
//         // console.log(dot_product(tile1.edge.[0].vec, tile1.edge[0].vec));
//
//         console.log('projections1');
//         console.log(projections1);
//         console.log('projections2');
//         console.log(projections2);
//
//         // console.log(tile1.edge[0].x, tile1.edge[0].y);
//         console.log(tile1.edge[0].vec.x, tile1.edge[0].vec.y);
//
//         if (
//             (Math.min(...projections1) - Math.max(...projections2) + 0.01 > 0) ||
//             (Math.min(...projections2) - Math.max(...projections1) + 0.01 > 0)
//         )
// 				{
// 					return 1; //not overlap
// 				}
//
//
//     }
//     // draw_line(tile1.edge[0].vec.x, tile1.edge[0].vec.y, -20000);
//
// }

function dot_product(vec1, vec2) {
    return vec1.x * vec2.x + vec1.y + vec2.y;
}

function normalize_vec(A, B) {

    this.norm = Math.sqrt(vec.x * vec.x + vec.y * vec.y);

}

function line_fun(a, b, c, x) {
    if (b !== 0)
        return (a * x + c) / -b;
    else {
        console.log('error -- b=0');
    }
}
//a_x and b_x -- нормаль
function draw_line(a_x, a_y, c) {
    this.x = 1000;
    var from = new Point(-this.x, line_fun(a_x, a_y, c, -this.x));
    var to = new Point(this.x, line_fun(a_x, a_y, c, this.x));
    var line = new Path.Line(from, to);
    line.strokeColor = 'red';
}

// =====================================================================
// =================  =====  ====  ====    =  =======  =================
// =================   ===   ===    ====  ==   ======  =================
// =================  =   =  ==  ==  ===  ==    =====  =================
// =================  == ==  =  ====  ==  ==  ==  ===  =================
// =================  =====  =  ====  ==  ==  ===  ==  =================
// =================  =====  =        ==  ==  ====  =  =================
// =================  =====  =  ====  ==  ==  =====    =================
// =================  =====  =  ====  ==  ==  ======   =================
// =================  =====  =  ====  =    =  =======  =================
// =====================================================================

Allowed_Diag_Pattens();

a_tiles = [];
b_tiles = [];
c_tiles = [];
tile = [];
thin = [];
var outer_edges = [];

// b_tiles[0] = new Square_Tile(paper.view.center.x, paper.view.center.y, 0);
// b_tiles[0] = new Rhombus_Tile(paper.view.center.x, paper.view.center.y, 0);
// b_tiles[0].edge[0].outer = true;
// b_tiles[0].edge[2].outer = true;
// b_tiles[0].edge[3].outer = true;
// b_tiles.push(new place_square_by_edge2(b_tiles[0], 0));
// b_tiles.push(new place_square_by_edge2(b_tiles[0], 1));
// b_tiles.push(new place_square_by_edge2(b_tiles[0], 2));
// b_tiles.push(new place_square_by_edge2(b_tiles[0], 3));
// b_tiles.push(new place_rhombus_by_edge(b_tiles[0], 0));
// b_tiles.push(new place_rhombus_by_edge(b_tiles[0], 1));
// b_tiles.push(new place_rhombus_by_edge(b_tiles[0], 2));
// b_tiles.push(new place_rhombus_by_edge(b_tiles[0], 3));
// b_tiles.push(new place_square_by_edge(b_tiles[1], 3));
// b_tiles[1].edge[0].outer = true;
// b_tiles[1].edge[3].outer = true;
// b_tiles.push(new place_rhombus_by_edge(b_tiles[1], 1));
// b_tiles.push(new place_square_by_edge(b_tiles[2], 0));

// var test_vert = 2;
// find_nearby_tiles(b_tiles[0].vert[test_vert], b_tiles);
// is_allowed_vert_diag(b_tiles[0].vert[test_vert], b_tiles);

// b_tiles[2].edge[0].outer = true;
// b_tiles[2].edge[1].outer = true;
// b_tiles[2].edge[3].outer = true;
// b_tiles.push(new place_rhombus_by_edge(b_tiles[0], 1));


// b_tiles.push(new place_rhombus_by_edge(b_tiles[1], 2));

// is_separated(b_tiles[0], b_tiles[1]);

// is_overlap(b_tiles[3], b_tiles);


// c_tiles[0] = new Rhombus_Tile(paper.view.center.x * 1, paper.view.center.y * 1.5, 0);
// c_tiles[1] = new Square_Tile(paper.view.center.x * 1.5, paper.view.center.y * 1.75, 0);
// c_tiles.push(new place_square_by_edge(c_tiles[0],2));

// #############################################################################################################
// #############################################################################################################
// #############################################################################################################
// function is_it_forced(edge, tiles) {
//     find_tiles_w_that_vertice(edge.firstSegment.point, b_tiles);
//     get_unic_vec(nearby_edges_as_vectors);
//     plot_pattern(unique_edges_as_vectors, 0.2, 1.5);
//     if (is_it_allowed(unique_edges_as_vectors)) {
//         return -666;
//
//     } else {
//         pop_tile(tiles);
//     }
//
//     return -666;
// }
// #############################################################################################################
// #############################################################################################################
// #############################################################################################################



// find_tiles_w_that_vertice(a_tiles[0].vert[2], a_tiles);
// find_tiles_w_that_vertice(b_tiles[0].vert[2], b_tiles);




// find_tiles_w_that_vertice(b_tiles[2].edge[1].firstSegment.point, b_tiles);


// find_tiles_w_that_vertice(b_tiles[2].edge[1].lastSegment.point, b_tiles);

// TODO: smoke a cig w/ coffee

// -------- кул



// дальше

// случайно выбираем ребро на границе
// ну или цикл
//
// for (var i = 0; i < outer_edges.length; i++) {
// 	if(is_it_forced_check(outer_edges[i])>0){
//
// }
// }
// для данного ребра проверяем тип, пока только является ли он типа forced
// 	если является, то поставить подходящий тайл
// 	подровнять outer_edges
// если нет,
//
//

// outer_edges[rand].strokeColor = 'FUCHSIA';
// console.log('is it forced', is_it_forced(outer_edges[rand], b_tiles));
// var k =0;
// while (k<20) {
// 	rand = Math.floor((Math.random() * outer_edges.length));
// 	console.log('is it forced', is_it_forced(outer_edges[rand], b_tiles));
//
// 	k++;
// }
// console.log(b_tiles);
// pop_tile([b_tiles.length-1], b_tiles);
// console.log(b_tiles);

// mark_edges(nearby_edges_as_vectors);
// mark_tiles(nearby_tiles);

// get_unic_vec(nearby_edges_as_vectors);

// console.log(unique_edges_as_vectors, nearby_edges_as_vectors);
// plot_pattern(unique_edges_as_vectors, 0.2, 1.5);



// console.log('sort_check');
// sort_vec(unique_edges_as_vectors);
// console.log(unique_edges_as_vectors);

// is_it_allowed(unique_edges_as_vectors);

var temp = 1;

temp = Math.floor((Math.random() * outer_edges.length));

remove_marks();

// #############################################################################################################
// #############################################################################################################
// #############################################################################################################
// #############################################################################################################
// #############################################################################################################
// #############################################################################################################


console.log('up up down down a a b c ');
