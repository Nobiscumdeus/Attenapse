#Importing major packages/libraries
from fastapi import FastAPI,HTTPException,Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine,Column,Integer,String,Boolean,DateTime,ForeignKey,Text,Date,DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional, List, Literal
from dotenv import load_dotenv
from sqlalchemy.dialects.postgresql import ENUM
from datetime import timedelta
from sqlalchemy.orm import joinedload
import json

import os

load_dotenv()

#Dynamic database connection 
def get_database_url():
    """Construct database URL from environment variables"""
    if os.getenv("DATABASE_URL"):
        return os.getenv("DATABASE_URL")
    
    # Fallback to individual components
    db_user = os.getenv("DB_USER", "postgres")
    db_password = os.getenv("DB_PASSWORD", "")
    db_host = os.getenv("DB_HOST", "localhost")
    db_port = os.getenv("DB_PORT", "5432")
    db_name = os.getenv("DB_NAME", "church_attendance")
    
    return f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

# Use the function
SQLALCHEMY_DATABASE_URL = get_database_url()

#Making the engine postgresql specific 
engine =create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=False, pool_size=20, max_overflow=0
)
SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)
Base = declarative_base()


###........................................................Models .....................................
class Member(Base):
    __tablename__ ="members"

    id = Column(Integer, primary_key=True, index=True)
    first_name =Column(String(100),nullable=False)
    last_name=Column(String(100),nullable=False)
    email=Column(String(255),unique=False,index=True,nullable=True)
    phone=Column(String(20))
    #executive=Column(Boolean,default=False)
    is_executive = Column(Boolean, default=False, nullable=False)
    office=Column(String(100))
    date_of_birth =Column(Date)
    is_new_member=Column(Boolean,default=True)
    is_active=Column(Boolean,default=True)
    joined_date=Column(DateTime,default=datetime.utcnow)
    address=Column(Text)
    emergency_contact =Column(String(20))
    sex=Column(ENUM('Male','Female',name='sex_type'),nullable=True)

    #Future biometric field
    fingerpprint_data =Column(Text,nullable=True)
    face_encoding =Column(Text,nullable=True)

    #Relationships
    attendance=relationship("Attendance",back_populates="member")


class Attendance(Base):
    __tablename__ = "attendances"
    
    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id", ondelete="CASCADE"))  # Added CASCADE
    service_date = Column(DateTime, nullable=False)
    checked_in_at = Column(DateTime, default=datetime.utcnow)
    attendance_method = Column(String(50), default="manual")  # Specified length
    notes = Column(Text)

    # Relationships
    member = relationship("Member", back_populates="attendance")




class ServiceSchedule(Base):
    __tablename__ = "service_schedules"
    
    id = Column(Integer, primary_key=True, index=True)
    service_name = Column(String(200), nullable=False)  # Specified length
    service_day = Column(Integer, default=6)  # 6=Sunday (0=Monday)
    service_time = Column(String(10), nullable=False)  # Specified length for time
    is_active = Column(Boolean, default=True)
    description = Column(Text)

#Create tables
Base.metadata.create_all(bind=engine)

#............................................Pydantic models .................................
class MemberBase(BaseModel):
    first_name:str
    last_name:str
    email:Optional[str] =None
    phone:Optional[str]=None
    sex:Optional[Literal['Male','Female']] =None #Sex field
   #executive:Optional[bool] =False 
    is_executive:Optional[bool] =False
    office:Optional[str]=None 
    date_of_birth:Optional[datetime] =None
    address:Optional[str] =None
    emergency_contact:Optional[str]=None

class MemberCreate(MemberBase):
    pass #Inherits all MemberBase fields 

class MemberUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    sex:Optional[Literal['Male','Female']]=None
    #executive: Optional[bool] = None
    is_executive: Optional[bool] = None
    office:Optional[str]=None
    date_of_birth:Optional[date]=None
    is_new_member: Optional[bool] = None
    is_active: Optional[bool] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None


#........................... For API Response ...............

class MemberResponse(MemberBase): #Inherits the core MemberBase fields and adds extra response field 
    id:int
    is_new_member:bool
    is_active:bool 
    joined_date:datetime

    class Config:
        from_attributes=True

    


class AttendanceCreate(BaseModel):
    member_id:int
    service_date:Optional[datetime] =None
    notes:Optional[str] =None


class AttendanceResponse(BaseModel):
    id:int
    member_id:int
    service_date:datetime
    checked_in_at:datetime
    attendance_method:str
    notes:Optional[str] =None
    member:MemberResponse 

    class Config:
        from_attributes=True


class AttendanceUpdate(BaseModel):
    notes: Optional[str] = None 
    service_date: Optional[datetime] = None  


class MemberDetailResponse(MemberBase):
    id:int
    is_new_member:bool
    is_active:bool
    joined_date:datetime
    attendance_records:List[AttendanceResponse] =[]
    total_attendance_count:int=0

    class Config:
        form_attributes= True



class BulkDeleteRequest(BaseModel):
    member_ids:List[int]



#....................................................Fast Api app ..........................................
app=FastAPI(title="Bethel Youth Attendance System",
             description="This API manages church member attendance, allowing for easy tracking and reporting of attendance records.",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc" ) # ReDoc)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



#Dependency 
def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
#Helper function to check if date is Sunday 
def is_sunday(check_date:datetime)->bool:
    return check_date.weekday() == 6



#.........................................................API Endpoints .........................................
@app.get("/")
def read_root():
    return {"message":"The Revolution Church Attendance System"}

#....................API to get all members .....................
@app.get("/members/",response_model=List[MemberResponse])
def get_members(skip:int=0,limit:int=100,db:Session=Depends(get_db)):
    members=db.query(Member).filter(Member.is_active==True).offset(skip).limit(limit).all()
    return members

#.....................API to get a single member by ID ...................
@app.get("/members/{member_id}",response_model=MemberResponse)
def get_single_member(member_id:int, db:Session=Depends(get_db)):
    member=db.query(Member).filter(Member.id==member_id).first()
    if member is None:
        raise HTTPException(status_code=404,detail="Ooops! Member not found")
    
    return member 



#.................... API to get a single member by ID with attendance history..........................
@app.get("/members/{member_id}/details", response_model=MemberDetailResponse)
def get_member_details(member_id: int, db: Session = Depends(get_db)):
    """Get comprehensive member details including attendance history"""
    member = db.query(Member).filter(Member.id == member_id).first()
    if member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    
    # Get attendance records
    attendance_records = db.query(Attendance).filter(Attendance.member_id == member_id).all()
    
    # Create response with attendance count
    member_dict = {
        "id": member.id,
        "first_name": member.first_name,
        "last_name": member.last_name,
        "email": member.email,
        "phone": member.phone,
        "date_of_birth": member.date_of_birth,
        "address": member.address,
        "emergency_contact": member.emergency_contact,
        "is_new_member": member.is_new_member,
        "is_active": member.is_active,
        "joined_date": member.joined_date,
        "attendance_records": attendance_records,
        "total_attendance_count": len(attendance_records)
    }
    
    return member_dict



#..................API to create new members with post request ...............
@app.post("/members/",response_model=MemberResponse)
def create_member(member:MemberCreate,db:Session=Depends(get_db)):
    # Check if email already exists
    existing_member = db.query(Member).filter(Member.email == member.email).first()
    if existing_member:
        raise HTTPException(
            status_code=400, 
            detail=f"Member with email '{member.email}' already exists"
        )
    
    db_member = Member(**member.dict())
    db.add(db_member)
    try:
        db.commit()
        db.refresh(db_member)
        return db_member
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create member")


#.....................API to update the details of members ................
@app.put("/members/{member_id}",response_model=MemberResponse)
def update_member(member_id:int,member_update:MemberUpdate,db:Session =Depends(get_db)):
    member=db.query(Member).filter(Member.id == member_id).first()
    if member is None:
        raise HTTPException(status_code=404,detail="Member not found ")
    

    for field,value in member_update.dict(exclude_unset=True).items():
        setattr(member,field,value)


    db.commit()
    db.refresh(member)
    return member

#.....................API to delete a single member by ID ...............
@app.delete("/members/{member_id}")
def delete_member(member_id: int, db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.id == member_id).first()
    if member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    
    # Soft delete - just mark as inactive
    member.is_active = False
    db.commit()
    return {"message": "Member deactivated successfully"}



# Or for hard delete of the member entirely :
@app.delete("/members/{member_id}/hard")
def hard_delete_member(member_id: int, db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.id == member_id).first()
    if member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    
    # Delete associated attendance records first
    db.query(Attendance).filter(Attendance.member_id == member_id).delete()
    db.delete(member)
    db.commit()
    return {"message": "Member permanently deleted"}



#.................... API endpoint to get all attendance records .....................

@app.get("/attendance/",response_model=List[AttendanceResponse])
def get_attendance(
    date_filter:Optional[str]=None,
    member_id:Optional[int]= None,
    db:Session=Depends(get_db)
):
    query=db.query(Attendance)


    if member_id:
        query=query.filter(Attendance.member_id == member_id)

    if date_filter:
        try:
            filter_date=datetime.fromisoformat(date_filter)
            query=query.filter(
                Attendance.service_date >= filter_date.replace(hour=0,minute=0,second=0),
                Attendance.service_date <= filter_date.replace(hour=23,minute=59,second=59)

            )
        except ValueError:
            raise HTTPException(status_code=400,detail="Invalid date format")
        

    attendances =query.all()
    return attendances 



#............................Attendance endpoints............................. 
@app.post("/attendance/mark",response_model=AttendanceResponse)
def mark_attendance(attendance:AttendanceCreate,db:Session=Depends(get_db)):
    #Check if member exists 
    member=db.query(Member).filter(Member.id == attendance.member_id).first()
    if not member:
        raise HTTPException(status_code=404,detail="Member not found")
    
    #Set service date if not provided
    service_date=attendance.service_date or datetime.now()

    #Check if it's sunday (optional enforcement)
    if not is_sunday(service_date):
        raise HTTPException(status_code=400,detail="Attendance can only be marked on Sundays")
    
    #Check if already marked for today 
  # Check if already marked for today
    existing_attendance = db.query(Attendance).filter(
        Attendance.member_id == attendance.member_id,
        Attendance.service_date >= service_date.replace(hour=0, minute=0, second=0),
        Attendance.service_date <= service_date.replace(hour=23, minute=59, second=59)
    ).first()

    if existing_attendance:
        raise HTTPException(status_code=400,detail="Attendance already marked for today")
    
    #Create attendance record 
    db_attendance =Attendance(
        member_id=attendance.member_id,
        service_date=service_date,
        notes=attendance.notes
    )

    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)


    return db_attendance


#............................... Update attendance record .........................
@app.put("/attendance/{attendance_id}", response_model=AttendanceResponse)
def update_attendance(
    attendance_id: int, 
    notes: Optional[str] = None, 
    service_date: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
    attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    
    # Fix the logic error here
    if notes is not None:  # Changed from 'is None' to 'is not None'
        attendance.notes = notes

    if service_date is not None:
        attendance.service_date = service_date

    db.commit()
    db.refresh(attendance)
    return attendance



#......................API to delete attendance history ........................
@app.delete("/attendance/{attendance_id}")
def delete_attendance(attendance_id: int, db: Session = Depends(get_db)):
    attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    
    db.delete(attendance)
    db.commit()
    return {"message": "Attendance record deleted successfully"}


#........................ API to get attendance summary statistics ...................

@app.get("/stats/summary")
def get_attendance_summary(db: Session = Depends(get_db)):
    total_members = db.query(Member).filter(Member.is_active == True).count()
    new_members = db.query(Member).filter(
        Member.is_new_member == True, 
        Member.is_active == True
    ).count()

    today = datetime.now()
    today_attendance = db.query(Attendance).filter(
        Attendance.service_date >= today.replace(hour=0, minute=0, second=0),
        Attendance.service_date <= today.replace(hour=23, minute=59, second=59)
    ).count()

    # Fix division by zero and calculation
    attendance_percentage = 0
    if total_members > 0:
        attendance_percentage = round((today_attendance / total_members) * 100, 2)

    return {
        "total_members": total_members,
        "new_members": new_members,
        "today_attendance": today_attendance,
        "attendance_percentage": attendance_percentage
    }



#.................................Endpoint to get present members for a specific Sunday............................
@app.get("/attendance/present/{service_date}")
def get_present_members(service_date:str,db:Session=Depends(get_db)):
    """ Get members for a specific Sunday"""
    try:
        date_obj=datetime.fromisoformat(service_date)

        #Check if its a Sunday 
        if date_obj.weekday() != 6:
            raise HTTPException(status_code=400,detail="Selected date must be a Sunday")
        
        #Get attendance records for that Sunday
        present_members =db.query(Attendance).join(Member).filter(
            Attendance.service_date >= date_obj.replace(hour=0,minute=0,second=0),
            Attendance.service_date <= date_obj.replace(hour=23,minute=59,second=59),
            Member.is_active ==True

        ).all()

        return {
            "service_date":service_date,
            "total_present":len(present_members),
            "members":present_members
        }

    except ValueError:
        raise HTTPException(status_code=400,detail="Invalid date format. Use YYYY-MM-DD")
    

#...............................Endpoint to get absent members for a specific Sunday .......................
# Endpoint to get absent members for a specific Sunday
@app.get("/attendance/absent/{service_date}")
def get_absent_members(service_date: str, db: Session = Depends(get_db)):
    """Get all members who were absent on a specific Sunday"""
    try:
        date_obj = datetime.fromisoformat(service_date)
        
        # Check if it's a Sunday
        if date_obj.weekday() != 6:
            raise HTTPException(status_code=400, detail="Selected date is not a Sunday")
        
        # Get all active members
        all_members = db.query(Member).filter(Member.is_active == True).all()
        
        # Get members who were present that day
        present_member_ids = db.query(Attendance.member_id).filter(
            Attendance.service_date >= date_obj.replace(hour=0, minute=0, second=0),
            Attendance.service_date <= date_obj.replace(hour=23, minute=59, second=59)
        ).all()
        
        present_ids = [pid[0] for pid in present_member_ids]
        
        # Filter out present members to get absent ones
        absent_members = [member for member in all_members if member.id not in present_ids]
        
        return {
            "service_date": service_date,
            "total_absent": len(absent_members),
            "members": absent_members
        }
        
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")



#...............................Endpoint to get complete Sunday service attendance summary .................
# Endpoint to get complete Sunday service attendance summary
@app.get("/attendance/sunday-summary/{service_date}")
def get_sunday_attendance_summary(service_date: str, db: Session = Depends(get_db)):
    """Get complete attendance summary for a specific Sunday"""
    try:
        date_obj = datetime.fromisoformat(service_date)
        
        # Check if it's a Sunday
        if date_obj.weekday() != 6:
            raise HTTPException(status_code=400, detail="Selected date is not a Sunday")
        
        # Get all active members
        all_members = db.query(Member).filter(Member.is_active == True).all()
        total_members = len(all_members)
        
        # Get attendance records for that Sunday
        present_records = db.query(Attendance).join(Member).filter(
            Attendance.service_date >= date_obj.replace(hour=0, minute=0, second=0),
            Attendance.service_date <= date_obj.replace(hour=23, minute=59, second=59),
            Member.is_active == True
        ).options(joinedload(Attendance.member)).all()
        
        present_member_ids = [record.member_id for record in present_records]
        absent_members = [member for member in all_members if member.id not in present_member_ids]
        
        attendance_percentage = round((len(present_records) / total_members * 100), 2) if total_members > 0 else 0
        
        return {
            "service_date": service_date,
            "day_name": date_obj.strftime("%A"),
            "total_members": total_members,
            "present_count": len(present_records),
            "absent_count": len(absent_members),
            "attendance_percentage": attendance_percentage,
            "present_members": present_records,
            "absent_members": absent_members
        }
        
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")


# Endpoint to get last few Sundays for quick access
@app.get("/attendance/recent-sundays")
def get_recent_sundays(limit: int = 4, db: Session = Depends(get_db)):
    """Get the last few Sundays with attendance data"""
    today = datetime.now().date()
    sundays = []
    
    # Find recent Sundays
    current_date = today
    while len(sundays) < limit:
        if current_date.weekday() == 6:  # Sunday
            sundays.append(current_date.isoformat())
        current_date -= timedelta(days=1)
    
    # Get attendance data for each Sunday
    sunday_data = []
    for sunday in sundays:
        date_obj = datetime.fromisoformat(sunday)
        
        # Get attendance count for this Sunday
        attendance_count = db.query(Attendance).filter(
            Attendance.service_date >= date_obj.replace(hour=0, minute=0, second=0),
            Attendance.service_date <= date_obj.replace(hour=23, minute=59, second=59)
        ).count()
        
        total_members = db.query(Member).filter(Member.is_active == True).count()
        percentage = round((attendance_count / total_members * 100), 2) if total_members > 0 else 0
        
        sunday_data.append({
            "date": sunday,
            "attendance_count": attendance_count,
            "total_members": total_members,
            "percentage": percentage
        })
    
    return {"recent_sundays": sunday_data}

#..........................API to help get attendances that have been marked already .................
@app.get("/attendance/today",response_model=List[AttendanceResponse])
def get_today_attendance(db:Session=Depends(get_db)):
    today=datetime.now()
    attendances = db.query(Attendance).filter(
        Attendance.service_date >= today.replace(hour=0,minute=0,second=0),
        Attendance.service_date <= today.replace(hour=23,minute=59,second=59)

    ).all()

    return attendances

#............... Automatic API generation.........................................
@app.on_event("startup")
async def save_openapi_json():
    #Create docs directory if it doesn't exist 
    os.makedirs("docs",exist_ok=True)

    with open("docs/openapi.json","w") as f:
        json.dump(app.openapi(),f,indent=2)

    print("OpenAPI JSON saved to docs/openapi.json")




'''
@app.post("/members", response_model=MemberResponse)  # Add this route without trailing slash
def create_member_alt(member: MemberCreate, db: Session = Depends(get_db)):
    db_member = Member(**member.dict())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member


    



#.................. API to Get member with attendance history.....................
@app.get("/members/{member_id}/attendance", response_model=List[AttendanceResponse])
def get_member_attendance(member_id: int, db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    attendances = db.query(Attendance).filter(Attendance.member_id == member_id).all()
    return attendances


# Optional: Add an endpoint for attendance statistics per member
@app.get("/members/{member_id}/stats")
def get_member_stats(member_id: int, db: Session = Depends(get_db)):
    """Get attendance statistics for a specific member"""
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    total_attendance = db.query(Attendance).filter(Attendance.member_id == member_id).count()
    
    # Get attendance for current year
    current_year = datetime.now().year
    year_start = datetime(current_year, 1, 1)
    year_attendance = db.query(Attendance).filter(
        Attendance.member_id == member_id,
        Attendance.service_date >= year_start
    ).count()
    
    # Calculate weeks since joining (rough estimate)
    weeks_since_joining = max(1, (datetime.now() - member.joined_date).days // 7)
    attendance_rate = round((total_attendance / weeks_since_joining) * 100, 2)
    
    return {
        "member_id": member_id,
        "total_attendance": total_attendance,
        "year_attendance": year_attendance,
        "weeks_since_joining": weeks_since_joining,
        "attendance_rate_percentage": min(100, attendance_rate),  # Cap at 100%
        "is_regular_attender": attendance_rate >= 75  # 75% or more attendance
    }




'''







'''
if __name__ == "__main__":
    import uvicorn
    import logging
    
    # Disable all logging
    logging.getLogger("uvicorn").setLevel(logging.CRITICAL)
    logging.getLogger("uvicorn.access").setLevel(logging.CRITICAL)
    
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=8000, 
        log_level="critical",
        access_log=False
    )
'''


if __name__ == "__main__":
    import uvicorn
    import logging
    
    # Disable uvicorn logs completely
    logging.getLogger("uvicorn").setLevel(logging.CRITICAL)
    logging.getLogger("uvicorn.access").setLevel(logging.CRITICAL)
    logging.getLogger("uvicorn.error").setLevel(logging.CRITICAL)
    
    # Also disable other common loggers
    logging.getLogger("fastapi").setLevel(logging.CRITICAL)
    logging.getLogger("asyncio").setLevel(logging.CRITICAL)

    print("🚀 Starting FastAPI server...")
    print("📖 API Documentation: http://localhost:8000/docs")
    print("🔄 ReDoc Documentation: http://localhost:8000/redoc")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="critical",  # Only critical messages
        access_log=False,      # No access logs
        use_colors=False       # Cleaner output
    )


