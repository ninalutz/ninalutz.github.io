
PImage source;      // Source image
//for each "worm", variables: position

//aimed direction
PVector aim=new PVector();
int locPixel;
ArrayList <PathFinder> PathFindersArray;
float seekX,seekY;

//worm's length
int maxLength;
int maxLayers;

//like pixels[], to keep track of how many times a point is reached by a worm
int [] buffer;
int [] limitDown;

//number of worms at the beginning
int numPoints;
public float inertia;

//width and length of the drawing area
int larg;
int top;
int largI;
int topI;

//brightness of the destination pixel
float briMax;

//minimum brightness threshold
public int minBrightness;
//maximum brightness threshold
public int maxBrightness;

//location of the tested point in pixels[]
int locTest;
int locTaX;
int locTaY;
int brightnessTemp;

//around a point (worms position), how many pixels will we look at...
int amplitudeTest;
//constrain the acceleration vector into a devMax radius circle
float devMax;
//constrain the speed vector into a vMax radius circle
float vMax;
//not used:random factor
int hazard;
//stroke's weight (slider) or radius of ellipse used for drawing
public float myweight;
//draw or not (button onOffButton)
public boolean drawing=true;
//different drawing options
boolean limit;

//setup only sets up what won't change:GUI and window params
//I use initialiser() to set up what has to be initialised
//when you hit "ResetButton" and drawAnimation() to set the drawing parameters
void setup() {
  larg=largI=800;
  top=topI=600;

  size(600,600);

  limit=false;

  source = loadImage("me.jpg");
  if(topI*source.width>largI*source.height){
    larg=largI;
    top=larg*source.height/source.width;
  }else{
    top=topI;
    larg=top*source.width/source.height;
  }
  
source.resize(larg,top);
source.loadPixels();
  fill(0);
  initialiser();
}

//launched after setup and any time you hit the ResetButton button
public void initialiser() { 
  drawing=true;
  numPoints=6;
  fill( 255 );
  stroke( 255 );
  rect( 0, 0, larg,top );
  buffer=new int[top*larg];
  smooth();
  inertia=6;
  maxLayers=20;
  myweight=.2;
  maxBrightness=200;
  minBrightness=0;
  amplitudeTest=1;
  maxLength=300;
  limit=true;
  hazard=0;
  devMax=4;
  vMax=50;
  strokeJoin(ROUND);
  PathFindersArray=new ArrayList <PathFinder>();
 
  for(int i=0;i<numPoints;i++) {
    
    PathFinder mPathFinder=new PathFinder(new PVector(random(larg),random(top)),new PVector(random(-3,3),random(-3,3)),inertia);
    
    while((brightness(mPathFinder.getImgPixel())>maxBrightness)||(brightness(mPathFinder.getImgPixel())<minBrightness))
    {
      mPathFinder.setP(int(random(larg)),int(random(top)));
    }
    PathFindersArray.add(mPathFinder);
  }
}



void draw() {

 if (drawing){
   
      for (int i = 0; i < numPoints; i++) {
        PathFinder mPathFinder = PathFindersArray.get(i);
        drawAnimation(mPathFinder);
        if (mPathFinder.isDeplace()) {
          mPathFinder.setDeplace(false);
        }
      }
 }
}



  void drawAnimation(PathFinder myPathFinder) {
    seekX = myPathFinder.getP().x;
    seekY = myPathFinder.getP().y;
    aim.x = 0;
    aim.y = 0;
    int pixelsPosition = floor(seekX) + floor(seekY) * larg;
    int locTestX = floor(seekX);
    int locTestY = floor(seekY);
    
    for (int i = -amplitudeTest; i < amplitudeTest + 1; i++) {
      for (int j = -amplitudeTest; j < amplitudeTest + 1; j++) {
        locTaX = locTestX + i;
        locTaY = locTestY + j;
        if ((locTaX > 0) && (locTaY > 0) && (locTaX < larg - 1) && (locTaY < top - 1)) {
          brightnessTemp = int(brightness(source.pixels[locTaX + larg * locTaY]));
          aim.sub(new PVector(i * brightnessTemp, j * brightnessTemp));
        }
      }
    }

    aim.normalize();
    aim.mult(100f/myPathFinder.inertia);
    myPathFinder.getV().add(new PVector(aim.x,aim.y));
    PVector deviation = myPathFinder.getV().get();
    deviation.normalize();
    deviation.mult(devMax);
    myPathFinder.getV().normalize();
    myPathFinder.getV().mult(vMax);
    myPathFinder.getP().add(deviation);
    
    
    // ******************different cases that lead to move the PathFinder to
    // another random place**************
    // outside window
    // worm's length is increased
    myPathFinder.setLongueur(myPathFinder.getLongueur() + 1);
    float positionBrightness=brightness(myPathFinder.getImgPixel());

    // PathFinder's moved if worm's too long
    if (myPathFinder.getLongueur() > maxLength) {
      deplacePoint(myPathFinder);
    }
    if ((myPathFinder.getP().x < 1) || (myPathFinder.getP().y < 1) || (myPathFinder.getP().x > larg - 1) || (myPathFinder.getP().y > top - 1))// ||
    {
      myPathFinder.setDeplace(true);
      deplacePoint(myPathFinder);
      return;
    }
    
    // buffer is an empty copy of the source image. It's increased every
    // time a point is reached.
    buffer[pixelsPosition]++;
    // If a point is reached n times, PathFinder is moved
    if (buffer[pixelsPosition] > maxLayers) {
      deplacePoint(myPathFinder);
    }

    // inside window, limit on and inside value range
    if ((limit) && (positionBrightness <= maxBrightness) && (positionBrightness >= minBrightness)) {
      if (myPathFinder.getlimitDown() != 0) {
        myPathFinder.setlimitDown(myPathFinder.getlimitDown() - 2);
      }
    }
    // limit on and outside value range
    if ((limit) && ((positionBrightness > maxBrightness) || (positionBrightness < minBrightness))) {
      if (myPathFinder.getlimitDown() == 0) {
        myPathFinder.setlimitDown(2);
      }
      myPathFinder.setlimitDown(myPathFinder.getlimitDown() + 4);// print(myPathFinder.limitDown+" ");
      if (myPathFinder.getlimitDown() >= 152 / myweight) {
        myPathFinder.setlimitDown(0);
        deplacePoint(myPathFinder);
      }
    }
    // null deviation
    if ((deviation.x == 0) && (deviation.y == 0)) {
      myPathFinder.setlimitDown(0);
      deplacePoint(myPathFinder);
    } 
      else briMax = brightness(source.pixels[pixelsPosition]);
    
    // go draw the PathFinder's shape
    myPathFinder.setlineWeight((float) (myweight * (1 - cos((myPathFinder.getLongueur()) * PI * 2 / (float) maxLength))));
    myPathFinder.setAlpha((max(0, (round(127 * myPathFinder.getlineWeight() / myweight) - (int) briMax / 2))));
    stroke(random(255), 0, 0,myPathFinder.getAlpha());
    strokeWeight(myPathFinder.getlineWeight());
    line(seekX,seekY,myPathFinder.getP().x,myPathFinder.getP().y);
    //println("Size "+myPathFinder.getlineWeight());
    // on cree un nouveau vers de temps en temps (on pourrait tester selon
    // la brilance de la zone...)
    // from times to times a new worm is created
    if (random(1) > 1 - (255 - briMax) / (500 * PathFindersArray.size())) {
      PathFindersArray.add(new PathFinder(new PVector(seekX, seekY), new PVector(myPathFinder.getV().x * random(-3,3), myPathFinder.getV().x
          * random(-3,3)), inertia));
      numPoints++;
      // Log.d("DrawingView","Size "+PathFindersArray.size());
    }
  }

  // *****************move the PathFinder function***************************
  void deplacePoint(PathFinder PathFinder) {
    PathFinder.setLongueur(0);
    PathFinder.setP(random(1, larg - 1), random(1, top - 1));
    while ((brightness(PathFinder.getImgPixel()) > maxBrightness)
        || (brightness(PathFinder.getImgPixel()) < minBrightness)) {
      PathFinder.setP(random(1, larg - 1), random(1, top - 1));
    }
    seekX = PathFinder.getP().x;
    seekY = PathFinder.getP().y;
  }
public void setDevMax(float devMax) {
    this.devMax = devMax;
  }
public class PathFinder {

  // position
  private PVector p = new PVector();
  // speed
  private PVector v = new PVector();
  private int imgPixel;
  private float inertia;
  // worm's length
  private float longueur;
  
  // worm's limit
  private int limitDown;
  
  // stroke weight
  private float lineWeight;
  private boolean deplace;
  private int alpha;


  // Constructor
  public PathFinder(PVector P, PVector V, float Inertia) {
    p = P;
    v = V;
    limitDown = 0;
    longueur = 0;
    setInertia(random(-2, 2) + Inertia);
    setDeplace(false);
  }


  public float getLongueur() {
    return longueur;
  }

  public void setLongueur(float longueur) {
    this.longueur = longueur;
  }

  public PVector getP() {
    return p;
  }

  public void setP(PVector p) {
    this.p = p;
  }

  public void setP(float a, float b) {
    this.p.x = a;
    this.p.y = b;
  }

  public PVector getV() {
    return v;
  }

  public void setV(PVector v) {
    this.v = v;
  }

  public void setV(float a, float b) {
    this.v.x = a;
    this.v.y = b;
  }

  public int getlimitDown() {
    return limitDown;
  }

  public void setlimitDown(int limitDown) {
    this.limitDown = limitDown;
  }

  public boolean isDeplace() {
    return deplace;
  }

  public void setDeplace(boolean deplace) {
    this.deplace = deplace;
  }

  public float getlineWeight() {
    return lineWeight;
  }

  public void setlineWeight(float lineWeight) {
    this.lineWeight = lineWeight;
  }

  public int getAlpha() {
    return alpha;
  }

  public void setAlpha(int alpha) {
    this.alpha = alpha;
  }

  public float getInertia() {
    return inertia;
  }
  
  public void setInertia(float inertia) {
      this.inertia = inertia;
    }
  
  public int getImgPixel(){
    if(getP().x>0 && getP().x<larg &&getP().y>0 && getP().y<top)
    return source.pixels[floor(getP().x)+floor(getP().y)*larg];
    else{
      return 0;
    }
  }

}