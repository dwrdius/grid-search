"use strict";
class Coord{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    static add(coord1, coord2){
        return new Coord(coord1.x+coord2.x, coord1.y, coord2.y);
    }
    static distance(coord1, coord2){
        let dx = coord1.x - coord2.x;
        let dy = coord1.y - coord2.y;
        return Math.abs(dx) + Math.abs(dy);
    }
}
// diamond shaped search
function searchByDistance(coord, dist){
    //identify furthest points
    let top = new Coord(coord.x,coord.y+dist);
    let left = new Coord(coord.x-dist,coord.y);
    let bottom = new Coord(coord.x,coord.y-dist);
    let right = new Coord(coord.x+dist,coord.y);
    //create a marker that logs the current position and starts at the top
    let current = new Coord(coord.x,coord.y+dist);
    let returnList = [];
    //marker goes around in a diamond shape logging all items with the specified manhattan distance
    while((current.x!==left.x)&&(current.y!==left.y)){
        if((current.x>=0)&&(current.y>=0)){
            returnList.push(new Coord(current.x,current.y));
        }
        current.x--;
        current.y--;
    }
    while((current.x!==bottom.x)&&(current.y!==bottom.y)){
        if((current.x>=0)&&(current.y>=0)){
            returnList.push(new Coord(current.x,current.y));
        }
        current.x++;
        current.y--;
    }
    while((current.x!==right.x)&&(current.y!==right.y)){
        if((current.x>=0)&&(current.y>=0)){
            returnList.push(new Coord(current.x,current.y));
        }
        current.x++;
        current.y++;
    }
    while((current.x!==top.x)&&(current.y!==top.y)){
        if((current.x>=0)&&(current.y>=0)){
            returnList.push(new Coord(current.x,current.y));
        }
        current.x--;
        current.y++;
    }
    return returnList;
}
function dumbSearch(coord, dist){
    let minX = coord.x-dist;
    let minY = coord.y-dist;
    let maxX = coord.x+dist;
    let maxY = coord.y+dist;
    let returnList = [];
    for(let i = minX; i<=maxX; i++){
        for(let j = minY; j<=maxY; j++){
            if(Coord.distance(coord, new Coord(i,j)) === dist){
                returnList.push(new Coord(i,j));
            }
        }
    }
    return returnList;
}

function test(coord, coordList){
    const SIZE = 20;
    let map = [];
    for(let i = 0; i<SIZE; i++){
        map[i] = [];
        for(let j = 0; j<SIZE; j++){
            map[i][j] = 'o';
        }
    }
    map[coord.x][coord.y] = '@';
    for(let e of coordList){
        if(e.x >=0 && e.x < SIZE && e.y >=0 && e.y < SIZE)
            map[e.x][e.y] = '$';
    }
    let output = '';
    for(let i = 0; i<SIZE; i++){
        for(let j = 0; j<SIZE; j++){
            output += map[i][j];
        }
        output += '\n';
    }
    console.log(output);
}

function time(search1, search2){
    let coord = new Coord(12,34);
    let dist = 5;
    console.time('first method');
    for(let i = 0; i<100000; i++){search1(coord, dist)}
    console.timeEnd('first method');
    console.time('second method');
    for(let i = 0; i<100000; i++){search2(coord, dist)}
    console.timeEnd('second method');
    let result1 = JSON.stringify(search1(coord,dist));
    let result2 = JSON.stringify(search2(coord,dist));
    console.log(`result 1: ${result1}`);
    console.log(`result 2: ${result2}`);
    console.log(result1 === result2 ? "SUCCESS" : "YOU SUCK")
}

let startCoord = new Coord(2,4);
//test the deletion method
test(startCoord, dumbSearch(startCoord, 5));
//test the diamond method
test(startCoord, searchByDistance(startCoord, 5));
//find the fastest time
time(dumbSearch, searchByDistance);