let box = [['-','-','-'],['-','-','-'],['-','-','-']];

function isFinal()
{

    // User win
    if((box[0][0]=='X' && box[0][1]=='X' && box[0][2]=='X') || ((box[1][0]=='X' && box[1][1]=='X' && box[1][2]=='X')) || ((box[2][0]=='X' && box[2][1]=='X' && box[2][2]=='X')) || (box[0][0]=='X' && box[1][0]=='X' && box[2][0]=='X') || ((box[0][1]=='X' && box[1][1]=='X' && box[2][1]=='X')) || ((box[0][2]=='X' && box[1][2]=='X' && box[2][2]=='X')) || ((box[0][0]=='X' && box[1][1]=='X' && box[2][2]=='X')) || ((box[0][2]=='X' && box[1][1]=='X' && box[2][0]=='X')) )
    {
        return 10;
    }

    // user lost
    else if((box[0][0]=='O' && box[0][1]=='O' && box[0][2]=='O') || ((box[1][0]=='O' && box[1][1]=='O' && box[1][2]=='O')) || ((box[2][0]=='O' && box[2][1]=='O' && box[2][2]=='O')) || (box[0][0]=='O' && box[1][0]=='O' && box[2][0]=='O') || ((box[0][1]=='O' && box[1][1]=='O' && box[2][1]=='O')) || ((box[0][2]=='O' && box[1][2]=='O' && box[2][2]=='O')) || ((box[0][0]=='O' && box[1][1]=='O' && box[2][2]=='O')) || ((box[0][2]=='O' && box[1][1]=='O' && box[2][0]=='O')))
    {
        return -10;
    }

    // draw
    let flag=0;

    for(let i=0;i<3;i++)
    {
        for(j=0;j<3;j++)
        {
            if(box[i][j]=='-')
            {
                flag=1;
                break;
            }
            if(flag==1)
            {
                break;
            }
        }
    }


    if(flag==0)
    {
        return 0;
    }
    else{
        return -1;
    }

}

function minimax(turn)
{

    let result = isFinal();

    if(result!=-1)
    {

        // console.log("reached base case and result is "+ result);

        let temp = {};
        temp.xcoord = -2;
        temp.ycoord = -2;
        temp.utilityValue = result;

        return temp;
    }


    if(turn==0)
    {

        let ans = Number.MIN_VALUE,x,y;

        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                if(box[i][j]=='-')
                {
                    box[i][j]='X';

                    let aage = minimax(1-turn);

                    if(ans<aage.utilityValue)
                    {
                        // console.log(i+j+"giving for X");
                        ans=aage.utilityValue;
                        x=i;
                        y=j;
                    }

                    box[i][j]='-';
                }
            }
        }

        let temp ={};
        temp.xcoord = x;
        temp.ycoord = y;
        temp.utilityValue = ans;

        return temp;

    }
    else{

        let ans = Number.MAX_VALUE,x,y;

        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                if(box[i][j]=='-')
                {
                    box[i][j]='O';

                    let aage = minimax(1-turn);

                    if(ans>aage.utilityValue)
                    {
                        // console.log(i+j+"giving for O");
                        ans=aage.utilityValue;
                        x=i;
                        y=j;
                    }


                    box[i][j]='-';
                }
            }
        }

        let temp ={};
        temp.xcoord = x;
        temp.ycoord = y;
        temp.utilityValue = ans;

        return temp;

    }

}

function printBox()
{

    console.log(box);

}

let flag=0;


function userClick(x,y)
{
    if(flag==1)
    {
        return;
    }

    if(box[x][y]!='-')
    {
        alert('Invalid Click');
        return;
    }
    // console.log("Clicked " + x + y)
    let elementId = 'a'+x+y;
    document.getElementById(elementId).innerHTML = 'X';
    box[x][y]='X';

    let result = isFinal();

    if(result==10)
    {
        printBox();
        console.log("You Won !");
        document.getElementById('footer').innerHTML='You won !';
        flag=1;
        return;
    }
    else if(result==0)
    {
        printBox();
        console.log("Game Drawn");
        document.getElementById('footer').innerHTML='Game Drawn';
        flag=1;
        return;
    }

    let temp = minimax(1);
    let AIx = temp.xcoord;
    let AIy = temp.ycoord;
    let utility = temp.utilityValue;

    // console.log("Ai selected " + AIx + AIy)
    elementId = 'a'+AIx+AIy;
    document.getElementById(elementId).innerHTML = 'O';
    box[AIx][AIy]='O';


    result = isFinal();

    if(result==-10)
    {

        printBox();
        console.log("You Lost, Better Luck Next Time");
        document.getElementById('footer').innerHTML='You Lost, Better Luck Next Time';
        flag=1;
        return;
    }
    else if(result==0)
    {
        printBox();
        console.log("Game Drawn");
        document.getElementById('footer').innerHTML='Game Drawn';
        flag=1;
        return;
    }
}


