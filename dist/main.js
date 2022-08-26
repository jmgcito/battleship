(()=>{var e={386:e=>{let t=[];function o(e,o,r){e.addEventListener("click",(()=>{t.push(o),t.push(r)}))}e.exports={createGridDiv:function(e){const t=document.createElement("div");t.setAttribute("id",`${e}-grid`);for(let r=0;r<10;r++)for(let n=0;n<10;n++){const c=document.createElement("div");c.id=`${e}-X${r}Y${n}`,o(c,r,n),c.style.cssText="background-color: blue",t.appendChild(c)}document.querySelector("#grids-container").appendChild(t)},updateBoard:function(e,t,o=!1){for(let r=0;r<10;r++)for(let n=0;n<10;n++){const c=t[r][n],l=document.querySelector(`#${e}-X${r}Y${n}`);isNaN(c)?l.style.cssText="h"==c?"background-color: red":"background-color: black":c>0&&o&&(l.style.cssText="background-color: grey")}},clickedCoord:t}},417:(e,t,o)=>{const{GameBoard:r}=o(498),{Player:n}=o(507),{randomCoord:c}=o(447),l=o(386),i=r(),a=r(),d=n(a),u=n(i);let s=[2,3,3,4,5],p="horizontal",h=!0;function f(){return(a.allSunk()||i.allSunk())&&(h=!1),h}function k(){l.updateBoard("user",i.boardMap,!0),l.updateBoard("computer",a.boardMap)}function v(){const e=l.clickedCoord.pop(),t=l.clickedCoord.pop();d.legalMove(t,e)&&h&&(d.attack(t,e),f(),h&&(u.autoPlay(c),f()),k())}function m(){const e=l.clickedCoord.pop(),t=l.clickedCoord.pop();let o=s.pop();i.legalPlacement(t,e,p,o)?i.placeShip(t,e,p,o):s.push(o),k(),s.length<1&&g(1)}function g(e){1==e?(window.removeEventListener("click",m),window.addEventListener("click",v)):(window.removeEventListener("click",v),window.addEventListener("click",m))}e.exports=function(){g(0),a.autoPlace(c),l.createGridDiv("user"),l.createGridDiv("computer"),k()}},498:(e,t,o)=>{const{Ship:r}=o(643);e.exports={GameBoard:()=>{let e=[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],t=[],o=0;const n=(o,n,c,l)=>{let i=[];for(let r=0;r<l;r++)e[o][n]=t.length+1,i.push([o,n]),"horizontal"==c?n++:o++;t.push(r(i))};function c(t,o,r,n){for(let c=0;c<n;c++){if(t>9||o>9)return!1;if(e[t][o]>0)return!1;"horizontal"==r?o++:t++}return!0}return{boardMap:e,placeShip:n,receiveAttack:(r,n)=>{let c=e[r][n];if(!isNaN(c)){if(c>0){let l=t[c-1];return l.hit(r,n),l.isSunk()&&o++,e[r][n]="h",!0}return e[r][n]="m",!1}},allSunk:()=>t.length-o==0,autoPlace:e=>{let t=0,o=0,r="horizontal",l=0,i=[5,4,3,3,2];for(let a=0;a<i.length;a++){do{t=e(),o=e(),r=e()%2==0?"horizontal":"vertical",l=i[a]}while(!c(t,o,r,l));n(t,o,r,l)}},legalPlacement:c}}}},507:e=>{e.exports={Player:e=>{const t=e;function o(e,o){return!(e<0||9<e||o<0||9<o||isNaN(t.boardMap[e][o]))}const r=(e,o)=>{t.receiveAttack(e,o)};return{attack:r,autoPlay:e=>{let t=e(),n=e();for(;!o(t,n);)t=e(),n=e();r(t,n)},legalMove:o}}}},447:e=>{e.exports={randomCoord:function(){return Math.floor(10*Math.random())}}},643:e=>{e.exports={Ship:e=>{const t=e.length;let o=0;const r=[];for(let o=0;o<t;o++)r[o]={row:e[o][0],col:e[o][1],hit:!1};return{shipParts:r,hit:(e,n)=>{for(let c=0;c<t;c++)if(r[c].row==e&&r[c].col==n)return void(r[c].hit||(r[c].hit=!0,o++))},isSunk:()=>t-o==0}}}}},t={};!function o(r){var n=t[r];if(void 0!==n)return n.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,o),c.exports}(417)()})();