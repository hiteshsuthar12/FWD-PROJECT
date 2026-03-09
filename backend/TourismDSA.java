import java.util.*;
class Hotel {

    String name;
    int price;

    Hotel(String name, int price) {
        this.name = name;
        this.price = price;
    }
}

public class TourismDSA {

    static Scanner sc = new Scanner(System.in);

    // HashMap State -> Cities
    static HashMap<String, ArrayList<String>> states = new HashMap<>();

    // HashMap City -> Destinations
    static HashMap<String, ArrayList<String>> destinations = new HashMap<>();

    // HashMap Destination -> Hotels
    static HashMap<String, ArrayList<Hotel>> hotels = new HashMap<>();

    // LinkedList Booking History
    static LinkedList<String> bookingHistory = new LinkedList<>();

    // Stack Undo Booking
    static Stack<String> undoStack = new Stack<>();

    // Queue Guide Waiting
    static Queue<String> guideQueue = new LinkedList<>();

    // HashMap Login Users
    static HashMap<String,String> users = new HashMap<>();


    static void loadData() {

        // USERS
        users.put("admin","1234");
        users.put("rohit","1111");


        // STATES
        states.put("Rajasthan",
                new ArrayList<>(Arrays.asList("Jaipur","Udaipur","Jodhpur","Bikaner","Bundi","Jaislmer")));

        states.put("Gujarat",
                new ArrayList<>(Arrays.asList("Ahmedabad","Somnath","varodra")));


        // DESTINATIONS
        destinations.put("Jaipur",
                new ArrayList<>(Arrays.asList("Hawa Mahal","Amber Fort")));

        destinations.put("Udaipur",
                new ArrayList<>(Arrays.asList("Lake Pichola","City Palace")));

        destinations.put("Ahmedabad",
                new ArrayList<>(Arrays.asList("Sabarmati Ashram")));

        destinations.put("Somnath",
                new ArrayList<>(Arrays.asList("Somnath Temple")));


        // HOTELS
        hotels.put("Hawa Mahal",
                new ArrayList<>(Arrays.asList(
                        new Hotel("Royal Palace Hotel",4000),
                        new Hotel("Pink City Hotel",2500)
                )));

        hotels.put("Amber Fort",
                new ArrayList<>(Arrays.asList(
                        new Hotel("Fort View Hotel",3500),
                        new Hotel("Heritage Stay",2800)
                )));

        hotels.put("Lake Pichola",
                new ArrayList<>(Arrays.asList(
                        new Hotel("Lake View Resort",5000),
                        new Hotel("Udaipur Palace",4200)
                )));

        hotels.put("City Palace",
                new ArrayList<>(Arrays.asList(
                        new Hotel("Royal Heritage",4500),
                        new Hotel("Palace Stay",3800)
                )));

        hotels.put("Sabarmati Ashram",
                new ArrayList<>(Arrays.asList(
                        new Hotel("Ahmedabad Residency",3000),
                        new Hotel("City Comfort",2200)
                )));

        hotels.put("Somnath Temple",
                new ArrayList<>(Arrays.asList(
                        new Hotel("Temple View Hotel",2700),
                        new Hotel("Somnath Guest House",1800)
                )));
    }


    static boolean login(){

        System.out.println("===== LOGIN =====");

        System.out.print("Username: ");
        String user=sc.next();

        System.out.print("Password: ");
        String pass=sc.next();

        if(users.containsKey(user) && users.get(user).equals(pass)){
            System.out.println("Login Successful\n");
            return true;
        }

        System.out.println("Invalid Login");
        return false;
    }


    static void bookTrip(){

        System.out.println("\nSelect State:");

        ArrayList<String> stateList=new ArrayList<>(states.keySet());

        for(int i=0;i<stateList.size();i++)
            System.out.println((i+1)+" "+stateList.get(i));

        int stateChoice=sc.nextInt();

        String selectedState=stateList.get(stateChoice-1);



        // CITY

        ArrayList<String> cityList=states.get(selectedState);

        System.out.println("\nCities:");

        for(int i=0;i<cityList.size();i++)
            System.out.println((i+1)+" "+cityList.get(i));

        int cityChoice=sc.nextInt();

        String selectedCity=cityList.get(cityChoice-1);



        // DESTINATION

        ArrayList<String> destList=destinations.get(selectedCity);

        System.out.println("\nDestinations:");

        for(int i=0;i<destList.size();i++)
            System.out.println((i+1)+" "+destList.get(i));

        int destChoice=sc.nextInt();

        String selectedDest=destList.get(destChoice-1);



        // HOTELS

        ArrayList<Hotel> hotelList=hotels.get(selectedDest);

        Collections.sort(hotelList,(a,b)->a.price-b.price);   // sorting

        System.out.println("\nHotels:");

        for(int i=0;i<hotelList.size();i++){

            Hotel h=hotelList.get(i);

            System.out.println((i+1)+" "+h.name+" ₹"+h.price);
        }

        int hotelChoice=sc.nextInt();

        Hotel selectedHotel=hotelList.get(hotelChoice-1);



        String booking=selectedState+" -> "+selectedCity+" -> "+selectedDest+" -> "+selectedHotel.name;

        bookingHistory.add(booking);
        undoStack.push(booking);

        System.out.println("\nBooking Successful!");
        System.out.println("Trip: "+booking);
    }



    static void showHistory(){

        System.out.println("\nBooking History:");

        for(String b:bookingHistory)
            System.out.println(b);
    }



    static void undoBooking(){

        if(!undoStack.isEmpty()){

            String last=undoStack.pop();
            bookingHistory.removeLast();

            System.out.println("Booking Cancelled: "+last);
        }

        else
            System.out.println("Nothing to Undo");
    }



    static void guideBooking(){

        System.out.print("Enter Name: ");

        String name=sc.next();

        guideQueue.add(name);

        System.out.println("Added to Guide Waiting List");
    }



    static void serveGuide(){

        if(!guideQueue.isEmpty()){

            String person=guideQueue.poll();

            System.out.println("Guide Assigned to "+person);
        }

        else
            System.out.println("No Waiting Customers");
    }



    public static void main(String[] args) {

        loadData();

        if(!login())
            return;


        while(true){

            System.out.println("\n===== TOURISM MANAGEMENT SYSTEM =====");

            System.out.println("1 Book Trip");
            System.out.println("2 Booking History");
            System.out.println("3 Undo Booking");
            System.out.println("4 Guide Booking");
            System.out.println("5 Serve Guide");
            System.out.println("6 Exit");

            int choice=sc.nextInt();

            switch(choice){

                case 1:
                    bookTrip();
                    break;

                case 2:
                    showHistory();
                    break;

                case 3:
                    undoBooking();
                    break;

                case 4:
                    guideBooking();
                    break;

                case 5:
                    serveGuide();
                    break;

                case 6:
                    System.exit(0);

                default:
                    System.out.println("Invalid Choice");
            }
        }
    }
}