export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "1test_base_client_fields_mandatory": {
        Row: {
          advertiser: string | null
          agency: string | null
          budget: string | null
          buyer: string | null
          buyeremail: string | null
          dayparts: string | null
          demos: string | null
          End: string | null
          estimate: string | null
          length: string | null
          product: string | null
          seller: string | null
          start: string | null
          station: string | null
          stream: string | null
          svc: string | null
          type: string | null
        }
        Insert: {
          advertiser?: string | null
          agency?: string | null
          budget?: string | null
          buyer?: string | null
          buyeremail?: string | null
          dayparts?: string | null
          demos?: string | null
          End?: string | null
          estimate?: string | null
          length?: string | null
          product?: string | null
          seller?: string | null
          start?: string | null
          station?: string | null
          stream?: string | null
          svc?: string | null
          type?: string | null
        }
        Update: {
          advertiser?: string | null
          agency?: string | null
          budget?: string | null
          buyer?: string | null
          buyeremail?: string | null
          dayparts?: string | null
          demos?: string | null
          End?: string | null
          estimate?: string | null
          length?: string | null
          product?: string | null
          seller?: string | null
          start?: string | null
          station?: string | null
          stream?: string | null
          svc?: string | null
          type?: string | null
        }
        Relationships: []
      }
      "1test_excel_ingestion": {
        Row: {
          "## 3/28/22": string | null
          "## 4/11/22": string | null
          "## 4/18/22": string | null
          "## 4/25/22": string | null
          "## 4/4/22": string | null
          "## 5/16/22": string | null
          "## 5/2/22": string | null
          "## 5/23/22": string | null
          "## 5/30/22": string | null
          "## 5/9/22": string | null
          "## 6/13/22": string | null
          "## 6/20/22": string | null
          "## 6/6/22": string | null
          "$$ 3/28": string | null
          "$$ 4/11": string | null
          "$$ 4/18": string | null
          "$$ 4/25": string | null
          "$$ 4/4": string | null
          "$$ 5/16": string | null
          "$$ 5/2": string | null
          "$$ 5/23": string | null
          "$$ 5/30": string | null
          "$$ 5/9": string | null
          "$$ 6/13": string | null
          "$$ 6/20": string | null
          "$$ 6/6": string | null
          AccCFM: string | null
          "Advertiser Code": string | null
          Affiliation: string | null
          "Agency Code": string | null
          "Agency Office Code": string | null
          "Agency Order Number": string | null
          AutoEC: string | null
          AutoTR: string | null
          Books: string | null
          Budget: string | null
          "Budget Note": string | null
          Buycode: string | null
          Buyer: string | null
          "CPE Client": string | null
          "CPE Estimate": string | null
          "CPE Product": string | null
          "CPE Product 2": string | null
          CPM: string | null
          CPP: string | null
          "Dare Routing Code": string | null
          "DAY/TIME": string | null
          Daypart: string | null
          Dayparts: string | null
          Demo: string | null
          "DEMO VALUE": string | null
          "Direct Response": string | null
          End: string | null
          "END DATE": string | null
          "eOrder Number": string | null
          "Former Rep Headline": string | null
          Headline: string | null
          "IMP 3/28": string | null
          "IMP 4/11": string | null
          "IMP 4/18": string | null
          "IMP 4/25": string | null
          "IMP 4/4": string | null
          "IMP 5/16": string | null
          "IMP 5/2": string | null
          "IMP 5/23": string | null
          "IMP 5/30": string | null
          "IMP 5/9": string | null
          "IMP 6/13": string | null
          "IMP 6/20": string | null
          "IMP 6/6": string | null
          Market: string | null
          "Paid Programming": string | null
          Product: string | null
          PROGRAM: string | null
          RATE: string | null
          "RATE CONFIRM": string | null
          "RATING SERVICE": string | null
          "Salesperson Code": string | null
          Seconds: string | null
          "Seller Office Code": string | null
          "Spot Length": string | null
          "Sta%": string | null
          Start: string | null
          "START DATE": string | null
          Station: string | null
          "Station Traffic Number": string | null
          SVC: string | null
          "TOTAL $": string | null
          "TOTAL IMPRESSIONS": string | null
          "TOTAL RATINGS": string | null
          "TOTAL SPOTS": string | null
          Trade: string | null
          Type: string | null
        }
        Insert: {
          "## 3/28/22"?: string | null
          "## 4/11/22"?: string | null
          "## 4/18/22"?: string | null
          "## 4/25/22"?: string | null
          "## 4/4/22"?: string | null
          "## 5/16/22"?: string | null
          "## 5/2/22"?: string | null
          "## 5/23/22"?: string | null
          "## 5/30/22"?: string | null
          "## 5/9/22"?: string | null
          "## 6/13/22"?: string | null
          "## 6/20/22"?: string | null
          "## 6/6/22"?: string | null
          "$$ 3/28"?: string | null
          "$$ 4/11"?: string | null
          "$$ 4/18"?: string | null
          "$$ 4/25"?: string | null
          "$$ 4/4"?: string | null
          "$$ 5/16"?: string | null
          "$$ 5/2"?: string | null
          "$$ 5/23"?: string | null
          "$$ 5/30"?: string | null
          "$$ 5/9"?: string | null
          "$$ 6/13"?: string | null
          "$$ 6/20"?: string | null
          "$$ 6/6"?: string | null
          AccCFM?: string | null
          "Advertiser Code"?: string | null
          Affiliation?: string | null
          "Agency Code"?: string | null
          "Agency Office Code"?: string | null
          "Agency Order Number"?: string | null
          AutoEC?: string | null
          AutoTR?: string | null
          Books?: string | null
          Budget?: string | null
          "Budget Note"?: string | null
          Buycode?: string | null
          Buyer?: string | null
          "CPE Client"?: string | null
          "CPE Estimate"?: string | null
          "CPE Product"?: string | null
          "CPE Product 2"?: string | null
          CPM?: string | null
          CPP?: string | null
          "Dare Routing Code"?: string | null
          "DAY/TIME"?: string | null
          Daypart?: string | null
          Dayparts?: string | null
          Demo?: string | null
          "DEMO VALUE"?: string | null
          "Direct Response"?: string | null
          End?: string | null
          "END DATE"?: string | null
          "eOrder Number"?: string | null
          "Former Rep Headline"?: string | null
          Headline?: string | null
          "IMP 3/28"?: string | null
          "IMP 4/11"?: string | null
          "IMP 4/18"?: string | null
          "IMP 4/25"?: string | null
          "IMP 4/4"?: string | null
          "IMP 5/16"?: string | null
          "IMP 5/2"?: string | null
          "IMP 5/23"?: string | null
          "IMP 5/30"?: string | null
          "IMP 5/9"?: string | null
          "IMP 6/13"?: string | null
          "IMP 6/20"?: string | null
          "IMP 6/6"?: string | null
          Market?: string | null
          "Paid Programming"?: string | null
          Product?: string | null
          PROGRAM?: string | null
          RATE?: string | null
          "RATE CONFIRM"?: string | null
          "RATING SERVICE"?: string | null
          "Salesperson Code"?: string | null
          Seconds?: string | null
          "Seller Office Code"?: string | null
          "Spot Length"?: string | null
          "Sta%"?: string | null
          Start?: string | null
          "START DATE"?: string | null
          Station?: string | null
          "Station Traffic Number"?: string | null
          SVC?: string | null
          "TOTAL $"?: string | null
          "TOTAL IMPRESSIONS"?: string | null
          "TOTAL RATINGS"?: string | null
          "TOTAL SPOTS"?: string | null
          Trade?: string | null
          Type?: string | null
        }
        Update: {
          "## 3/28/22"?: string | null
          "## 4/11/22"?: string | null
          "## 4/18/22"?: string | null
          "## 4/25/22"?: string | null
          "## 4/4/22"?: string | null
          "## 5/16/22"?: string | null
          "## 5/2/22"?: string | null
          "## 5/23/22"?: string | null
          "## 5/30/22"?: string | null
          "## 5/9/22"?: string | null
          "## 6/13/22"?: string | null
          "## 6/20/22"?: string | null
          "## 6/6/22"?: string | null
          "$$ 3/28"?: string | null
          "$$ 4/11"?: string | null
          "$$ 4/18"?: string | null
          "$$ 4/25"?: string | null
          "$$ 4/4"?: string | null
          "$$ 5/16"?: string | null
          "$$ 5/2"?: string | null
          "$$ 5/23"?: string | null
          "$$ 5/30"?: string | null
          "$$ 5/9"?: string | null
          "$$ 6/13"?: string | null
          "$$ 6/20"?: string | null
          "$$ 6/6"?: string | null
          AccCFM?: string | null
          "Advertiser Code"?: string | null
          Affiliation?: string | null
          "Agency Code"?: string | null
          "Agency Office Code"?: string | null
          "Agency Order Number"?: string | null
          AutoEC?: string | null
          AutoTR?: string | null
          Books?: string | null
          Budget?: string | null
          "Budget Note"?: string | null
          Buycode?: string | null
          Buyer?: string | null
          "CPE Client"?: string | null
          "CPE Estimate"?: string | null
          "CPE Product"?: string | null
          "CPE Product 2"?: string | null
          CPM?: string | null
          CPP?: string | null
          "Dare Routing Code"?: string | null
          "DAY/TIME"?: string | null
          Daypart?: string | null
          Dayparts?: string | null
          Demo?: string | null
          "DEMO VALUE"?: string | null
          "Direct Response"?: string | null
          End?: string | null
          "END DATE"?: string | null
          "eOrder Number"?: string | null
          "Former Rep Headline"?: string | null
          Headline?: string | null
          "IMP 3/28"?: string | null
          "IMP 4/11"?: string | null
          "IMP 4/18"?: string | null
          "IMP 4/25"?: string | null
          "IMP 4/4"?: string | null
          "IMP 5/16"?: string | null
          "IMP 5/2"?: string | null
          "IMP 5/23"?: string | null
          "IMP 5/30"?: string | null
          "IMP 5/9"?: string | null
          "IMP 6/13"?: string | null
          "IMP 6/20"?: string | null
          "IMP 6/6"?: string | null
          Market?: string | null
          "Paid Programming"?: string | null
          Product?: string | null
          PROGRAM?: string | null
          RATE?: string | null
          "RATE CONFIRM"?: string | null
          "RATING SERVICE"?: string | null
          "Salesperson Code"?: string | null
          Seconds?: string | null
          "Seller Office Code"?: string | null
          "Spot Length"?: string | null
          "Sta%"?: string | null
          Start?: string | null
          "START DATE"?: string | null
          Station?: string | null
          "Station Traffic Number"?: string | null
          SVC?: string | null
          "TOTAL $"?: string | null
          "TOTAL IMPRESSIONS"?: string | null
          "TOTAL RATINGS"?: string | null
          "TOTAL SPOTS"?: string | null
          Trade?: string | null
          Type?: string | null
        }
        Relationships: []
      }
      "1test_gemini": {
        Row: {
          access_code: string | null
          access_name: string | null
          buyer_email: string | null
          buyer_name: string | null
          client_name: string | null
          contact_email: string | null
          contact_name: string | null
          cost: string | null
          created_at: string | null
          days: string | null
          dpt: string | null
          flight_schedule: string | null
          id: number
          len: string | null
          market: string | null
          media_code: string | null
          office_code: string | null
          office_name: string | null
          product_name: string | null
          programming: string | null
          station_code: string | null
          station_name: string | null
          times: string | null
          tot: string | null
          total: string | null
          updated_at: string | null
          weekly_breakdown: string[] | null
        }
        Insert: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          cost?: string | null
          created_at?: string | null
          days?: string | null
          dpt?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          office_code?: string | null
          office_name?: string | null
          product_name?: string | null
          programming?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Update: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          cost?: string | null
          created_at?: string | null
          days?: string | null
          dpt?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          office_code?: string | null
          office_name?: string | null
          product_name?: string | null
          programming?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Relationships: []
      }
      "1test_llama_gemini": {
        Row: {
          access_code: string | null
          access_name: string | null
          buyer_email: string | null
          buyer_name: string | null
          client_code: string | null
          client_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          cost: string | null
          cost_type: string | null
          created_at: string | null
          date_of_media_schedule: string | null
          days: string | null
          dpt: string | null
          estimate_code: string | null
          flight_schedule: string | null
          id: number
          len: string | null
          market: string | null
          media_code: string | null
          media_name: string | null
          office_code: string | null
          office_name: string | null
          page: string | null
          product_code: string | null
          product_name: string | null
          programming: string | null
          source_file: string | null
          station_code: string | null
          station_name: string | null
          times: string | null
          tot: string | null
          total: string | null
          updated_at: string | null
          weekly_breakdown: string[] | null
        }
        Insert: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Update: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Relationships: []
      }
      "1test_llama_gemini_problem_test": {
        Row: {
          access_code: string | null
          access_name: string | null
          buyer_email: string | null
          buyer_name: string | null
          client_code: string | null
          client_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          cost: string | null
          cost_type: string | null
          created_at: string | null
          date_of_media_schedule: string | null
          days: string | null
          dpt: string | null
          estimate_code: string | null
          flight_schedule: string | null
          id: number
          len: string | null
          market: string | null
          media_code: string | null
          media_name: string | null
          office_code: string | null
          office_name: string | null
          page: string | null
          product_code: string | null
          product_name: string | null
          programming: string | null
          source_file: string | null
          station_code: string | null
          station_name: string | null
          times: string | null
          tot: string | null
          total: string | null
          updated_at: string | null
          weekly_breakdown: string[] | null
        }
        Insert: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Update: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Relationships: []
      }
      "1test_llama_openai": {
        Row: {
          access_code: string | null
          access_name: string | null
          buyer_email: string | null
          buyer_name: string | null
          client_code: string | null
          client_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          cost: string | null
          cost_type: string | null
          created_at: string | null
          date_of_media_schedule: string | null
          days: string | null
          dpt: string | null
          estimate_code: string | null
          flight_schedule: string | null
          id: number
          len: string | null
          market: string | null
          media_code: string | null
          media_name: string | null
          office_code: string | null
          office_name: string | null
          page: string | null
          product_code: string | null
          product_name: string | null
          programming: string | null
          source_file: string | null
          station_code: string | null
          station_name: string | null
          times: string | null
          tot: string | null
          total: string | null
          updated_at: string | null
          weekly_breakdown: string[] | null
        }
        Insert: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Update: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Relationships: []
      }
      "1test_llama_openai_25_order_run": {
        Row: {
          access_code: string | null
          access_name: string | null
          buyer_email: string | null
          buyer_name: string | null
          client_code: string | null
          client_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          cost: string | null
          cost_type: string | null
          created_at: string | null
          date_of_media_schedule: string | null
          days: string | null
          dpt: string | null
          estimate_code: string | null
          flight_schedule: string | null
          id: number
          len: string | null
          market: string | null
          media_code: string | null
          media_name: string | null
          office_code: string | null
          office_name: string | null
          page: string | null
          product_code: string | null
          product_name: string | null
          programming: string | null
          source_file: string | null
          station_code: string | null
          station_name: string | null
          times: string | null
          tot: string | null
          total: string | null
          updated_at: string | null
          weekly_breakdown: string[] | null
        }
        Insert: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Update: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Relationships: []
      }
      "1test_llama_openai_joe_test": {
        Row: {
          access_code: string | null
          access_name: string | null
          buyer_email: string | null
          buyer_name: string | null
          client_code: string | null
          client_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          cost: string | null
          cost_type: string | null
          created_at: string | null
          date_of_media_schedule: string | null
          days: string | null
          dpt: string | null
          estimate_code: string | null
          flight_schedule: string | null
          id: number
          len: string | null
          market: string | null
          media_code: string | null
          media_name: string | null
          office_code: string | null
          office_name: string | null
          page: string | null
          product_code: string | null
          product_name: string | null
          programming: string | null
          source_file: string | null
          station_code: string | null
          station_name: string | null
          times: string | null
          tot: string | null
          total: string | null
          updated_at: string | null
          weekly_breakdown: string[] | null
        }
        Insert: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Update: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Relationships: []
      }
      "1test_llama_openai_paul_test": {
        Row: {
          access_code: string | null
          access_name: string | null
          buyer_email: string | null
          buyer_name: string | null
          client_code: string | null
          client_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          cost: string | null
          cost_type: string | null
          created_at: string | null
          date_of_media_schedule: string | null
          days: string | null
          dpt: string | null
          estimate_code: string | null
          flight_schedule: string | null
          id: number
          len: string | null
          market: string | null
          media_code: string | null
          media_name: string | null
          office_code: string | null
          office_name: string | null
          page: string | null
          product_code: string | null
          product_name: string | null
          programming: string | null
          source_file: string | null
          station_code: string | null
          station_name: string | null
          times: string | null
          tot: string | null
          total: string | null
          updated_at: string | null
          weekly_breakdown: string[] | null
        }
        Insert: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Update: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Relationships: []
      }
      "1test_llama_openai_problem_test": {
        Row: {
          access_code: string | null
          access_name: string | null
          buyer_email: string | null
          buyer_name: string | null
          client_code: string | null
          client_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          cost: string | null
          cost_type: string | null
          created_at: string | null
          date_of_media_schedule: string | null
          days: string | null
          dpt: string | null
          estimate_code: string | null
          flight_schedule: string | null
          id: number
          len: string | null
          market: string | null
          media_code: string | null
          media_name: string | null
          office_code: string | null
          office_name: string | null
          page: string | null
          product_code: string | null
          product_name: string | null
          programming: string | null
          source_file: string | null
          station_code: string | null
          station_name: string | null
          times: string | null
          tot: string | null
          total: string | null
          updated_at: string | null
          weekly_breakdown: string[] | null
        }
        Insert: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Update: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Relationships: []
      }
      "1test_llama_openai_showcase": {
        Row: {
          access_code: string | null
          access_name: string | null
          buyer_email: string | null
          buyer_name: string | null
          client_code: string | null
          client_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          cost: string | null
          cost_type: string | null
          created_at: string | null
          date_of_media_schedule: string | null
          days: string | null
          dpt: string | null
          estimate_code: string | null
          flight_schedule: string | null
          id: number
          len: string | null
          market: string | null
          media_code: string | null
          media_name: string | null
          office_code: string | null
          office_name: string | null
          page: string | null
          product_code: string | null
          product_name: string | null
          programming: string | null
          source_file: string | null
          station_code: string | null
          station_name: string | null
          times: string | null
          tot: string | null
          total: string | null
          updated_at: string | null
          weekly_breakdown: string[] | null
        }
        Insert: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Update: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Relationships: []
      }
      "1test_mistral_ai": {
        Row: {
          Access: string | null
          Client: string | null
          Contact: string | null
          Cost: string | null
          Days: Json | null
          Dpt: Json | null
          Email: string | null
          Estimate: string | null
          "File Name": string
          "Flight Dates": string | null
          id: number | null
          Len: Json | null
          Market: string | null
          Media: string | null
          Office: string | null
          Product: string | null
          Programming: Json | null
          Station: string | null
          Times: Json | null
          Total: Json | null
        }
        Insert: {
          Access?: string | null
          Client?: string | null
          Contact?: string | null
          Cost?: string | null
          Days?: Json | null
          Dpt?: Json | null
          Email?: string | null
          Estimate?: string | null
          "File Name": string
          "Flight Dates"?: string | null
          id?: number | null
          Len?: Json | null
          Market?: string | null
          Media?: string | null
          Office?: string | null
          Product?: string | null
          Programming?: Json | null
          Station?: string | null
          Times?: Json | null
          Total?: Json | null
        }
        Update: {
          Access?: string | null
          Client?: string | null
          Contact?: string | null
          Cost?: string | null
          Days?: Json | null
          Dpt?: Json | null
          Email?: string | null
          Estimate?: string | null
          "File Name"?: string
          "Flight Dates"?: string | null
          id?: number | null
          Len?: Json | null
          Market?: string | null
          Media?: string | null
          Office?: string | null
          Product?: string | null
          Programming?: Json | null
          Station?: string | null
          Times?: Json | null
          Total?: Json | null
        }
        Relationships: []
      }
      "4testing_media_schedule": {
        Row: {
          acc_cfm: string | null
          advertiser_code: string | null
          affiliation: string | null
          agency_code: string | null
          agency_office_code: string | null
          agency_order_number: string | null
          auto_ec: string | null
          auto_tr: string | null
          books: string | null
          budget: string | null
          budget_note: string | null
          buycode: string | null
          buyer: string | null
          cpe_client: string | null
          cpe_estimate: string | null
          cpe_product: string | null
          cpe_product_2: string | null
          cpm: string | null
          cpp: string | null
          dare_routing_code: string | null
          day_time: string | null
          daypart: string | null
          dayparts: string | null
          demo: string | null
          demo_value: string | null
          direct_response: string | null
          end: string | null
          end_date: string | null
          eorder_number: string | null
          former_rep_headline: string | null
          headline: string | null
          market: string | null
          paid_programming: string | null
          product: string | null
          program: string | null
          rate: string | null
          rate_confirm: string | null
          rating_service: string | null
          salesperson_code: string | null
          seconds: string | null
          seller_office_code: string | null
          spot_length: string | null
          sta_percent: string | null
          start: string | null
          start_date: string | null
          station: string | null
          station_traffic_number: string | null
          svc: string | null
          total_dollars: string | null
          total_impressions: string | null
          total_ratings: string | null
          total_spots: string | null
          trade: string | null
          type: string | null
          weekly_dollars: string | null
          weekly_impressions: string | null
          weekly_spots: string | null
        }
        Insert: {
          acc_cfm?: string | null
          advertiser_code?: string | null
          affiliation?: string | null
          agency_code?: string | null
          agency_office_code?: string | null
          agency_order_number?: string | null
          auto_ec?: string | null
          auto_tr?: string | null
          books?: string | null
          budget?: string | null
          budget_note?: string | null
          buycode?: string | null
          buyer?: string | null
          cpe_client?: string | null
          cpe_estimate?: string | null
          cpe_product?: string | null
          cpe_product_2?: string | null
          cpm?: string | null
          cpp?: string | null
          dare_routing_code?: string | null
          day_time?: string | null
          daypart?: string | null
          dayparts?: string | null
          demo?: string | null
          demo_value?: string | null
          direct_response?: string | null
          end?: string | null
          end_date?: string | null
          eorder_number?: string | null
          former_rep_headline?: string | null
          headline?: string | null
          market?: string | null
          paid_programming?: string | null
          product?: string | null
          program?: string | null
          rate?: string | null
          rate_confirm?: string | null
          rating_service?: string | null
          salesperson_code?: string | null
          seconds?: string | null
          seller_office_code?: string | null
          spot_length?: string | null
          sta_percent?: string | null
          start?: string | null
          start_date?: string | null
          station?: string | null
          station_traffic_number?: string | null
          svc?: string | null
          total_dollars?: string | null
          total_impressions?: string | null
          total_ratings?: string | null
          total_spots?: string | null
          trade?: string | null
          type?: string | null
          weekly_dollars?: string | null
          weekly_impressions?: string | null
          weekly_spots?: string | null
        }
        Update: {
          acc_cfm?: string | null
          advertiser_code?: string | null
          affiliation?: string | null
          agency_code?: string | null
          agency_office_code?: string | null
          agency_order_number?: string | null
          auto_ec?: string | null
          auto_tr?: string | null
          books?: string | null
          budget?: string | null
          budget_note?: string | null
          buycode?: string | null
          buyer?: string | null
          cpe_client?: string | null
          cpe_estimate?: string | null
          cpe_product?: string | null
          cpe_product_2?: string | null
          cpm?: string | null
          cpp?: string | null
          dare_routing_code?: string | null
          day_time?: string | null
          daypart?: string | null
          dayparts?: string | null
          demo?: string | null
          demo_value?: string | null
          direct_response?: string | null
          end?: string | null
          end_date?: string | null
          eorder_number?: string | null
          former_rep_headline?: string | null
          headline?: string | null
          market?: string | null
          paid_programming?: string | null
          product?: string | null
          program?: string | null
          rate?: string | null
          rate_confirm?: string | null
          rating_service?: string | null
          salesperson_code?: string | null
          seconds?: string | null
          seller_office_code?: string | null
          spot_length?: string | null
          sta_percent?: string | null
          start?: string | null
          start_date?: string | null
          station?: string | null
          station_traffic_number?: string | null
          svc?: string | null
          total_dollars?: string | null
          total_impressions?: string | null
          total_ratings?: string | null
          total_spots?: string | null
          trade?: string | null
          type?: string | null
          weekly_dollars?: string | null
          weekly_impressions?: string | null
          weekly_spots?: string | null
        }
        Relationships: []
      }
      "darwin-extract-data": {
        Row: {
          AgencyName: string | null
          Client: string | null
          created_at: string
          Estimate: string | null
          id: number
          Market: string | null
          name: string | null
          Product: string | null
          Station: string | null
        }
        Insert: {
          AgencyName?: string | null
          Client?: string | null
          created_at?: string
          Estimate?: string | null
          id?: number
          Market?: string | null
          name?: string | null
          Product?: string | null
          Station?: string | null
        }
        Update: {
          AgencyName?: string | null
          Client?: string | null
          created_at?: string
          Estimate?: string | null
          id?: number
          Market?: string | null
          name?: string | null
          Product?: string | null
          Station?: string | null
        }
        Relationships: []
      }
      extended_media_orders: {
        Row: {
          "2024_02_05": number | null
          "2024_02_12": number | null
          "2024_02_19": number | null
          "2024_02_26": number | null
          "2024_03_04": number | null
          "2024_03_11": number | null
          "2024_03_18": number | null
          "2024_03_25": number | null
          "2024_04_01": number | null
          "2024_04_08": number | null
          "2024_04_15": number | null
          "2024_04_22": number | null
          "2024_04_29": number | null
          "2024_05_06": number | null
          "2024_05_13": number | null
          "2024_05_20": number | null
          "2024_05_27": number | null
          "2024_06_03": number | null
          "2024_06_10": number | null
          "2024_06_17": number | null
          "2024_06_24": number | null
          "2024_07_01": number | null
          "2024_07_08": number | null
          "2024_07_15": number | null
          "2024_07_22": number | null
          "2024_07_29": number | null
          "2024_08_05": number | null
          "2024_08_12": number | null
          "2024_08_19": number | null
          "2024_08_26": number | null
          "2024_09_02": number | null
          "2024_09_09": number | null
          "2024_09_16": number | null
          "2024_09_23": number | null
          "2024_09_30": number | null
          "2024_10_07": number | null
          "2024_10_14": number | null
          "2024_10_21": number | null
          "2024_10_28": number | null
          "2024_11_04": number | null
          "2024_11_11": number | null
          "2024_11_18": number | null
          "2024_11_25": number | null
          "2024_12_02": number | null
          "2024_12_09": number | null
          "2024_12_16": number | null
          "2024_12_23": number | null
          "2024_12_30": number | null
          "2025_01_06": number | null
          "2025_01_13": number | null
          "2025_01_20": number | null
          "2025_01_27": number | null
          "2025_02_03": number | null
          "2025_02_10": number | null
          "2025_02_17": number | null
          "2025_02_24": number | null
          "2025_03_03": number | null
          "2025_03_10": number | null
          access: string | null
          agency_buyer: string | null
          buyer: string | null
          buyer_email: string | null
          client: string | null
          contact: string | null
          cost: number | null
          days: string | null
          dpt: string | null
          email: string | null
          estimate: string | null
          file_name: string
          id: number | null
          len: string | null
          market: string | null
          media: string | null
          office: string | null
          other_comments: string | null
          phone: string | null
          product: string | null
          programming: string | null
          row_cost: number | null
          row_date: string | null
          row_page: string | null
          row_table: Json | null
          station: string | null
          station_phone: string | null
          times: string | null
          tot: number | null
        }
        Insert: {
          "2024_02_05"?: number | null
          "2024_02_12"?: number | null
          "2024_02_19"?: number | null
          "2024_02_26"?: number | null
          "2024_03_04"?: number | null
          "2024_03_11"?: number | null
          "2024_03_18"?: number | null
          "2024_03_25"?: number | null
          "2024_04_01"?: number | null
          "2024_04_08"?: number | null
          "2024_04_15"?: number | null
          "2024_04_22"?: number | null
          "2024_04_29"?: number | null
          "2024_05_06"?: number | null
          "2024_05_13"?: number | null
          "2024_05_20"?: number | null
          "2024_05_27"?: number | null
          "2024_06_03"?: number | null
          "2024_06_10"?: number | null
          "2024_06_17"?: number | null
          "2024_06_24"?: number | null
          "2024_07_01"?: number | null
          "2024_07_08"?: number | null
          "2024_07_15"?: number | null
          "2024_07_22"?: number | null
          "2024_07_29"?: number | null
          "2024_08_05"?: number | null
          "2024_08_12"?: number | null
          "2024_08_19"?: number | null
          "2024_08_26"?: number | null
          "2024_09_02"?: number | null
          "2024_09_09"?: number | null
          "2024_09_16"?: number | null
          "2024_09_23"?: number | null
          "2024_09_30"?: number | null
          "2024_10_07"?: number | null
          "2024_10_14"?: number | null
          "2024_10_21"?: number | null
          "2024_10_28"?: number | null
          "2024_11_04"?: number | null
          "2024_11_11"?: number | null
          "2024_11_18"?: number | null
          "2024_11_25"?: number | null
          "2024_12_02"?: number | null
          "2024_12_09"?: number | null
          "2024_12_16"?: number | null
          "2024_12_23"?: number | null
          "2024_12_30"?: number | null
          "2025_01_06"?: number | null
          "2025_01_13"?: number | null
          "2025_01_20"?: number | null
          "2025_01_27"?: number | null
          "2025_02_03"?: number | null
          "2025_02_10"?: number | null
          "2025_02_17"?: number | null
          "2025_02_24"?: number | null
          "2025_03_03"?: number | null
          "2025_03_10"?: number | null
          access?: string | null
          agency_buyer?: string | null
          buyer?: string | null
          buyer_email?: string | null
          client?: string | null
          contact?: string | null
          cost?: number | null
          days?: string | null
          dpt?: string | null
          email?: string | null
          estimate?: string | null
          file_name: string
          id?: number | null
          len?: string | null
          market?: string | null
          media?: string | null
          office?: string | null
          other_comments?: string | null
          phone?: string | null
          product?: string | null
          programming?: string | null
          row_cost?: number | null
          row_date?: string | null
          row_page?: string | null
          row_table?: Json | null
          station?: string | null
          station_phone?: string | null
          times?: string | null
          tot?: number | null
        }
        Update: {
          "2024_02_05"?: number | null
          "2024_02_12"?: number | null
          "2024_02_19"?: number | null
          "2024_02_26"?: number | null
          "2024_03_04"?: number | null
          "2024_03_11"?: number | null
          "2024_03_18"?: number | null
          "2024_03_25"?: number | null
          "2024_04_01"?: number | null
          "2024_04_08"?: number | null
          "2024_04_15"?: number | null
          "2024_04_22"?: number | null
          "2024_04_29"?: number | null
          "2024_05_06"?: number | null
          "2024_05_13"?: number | null
          "2024_05_20"?: number | null
          "2024_05_27"?: number | null
          "2024_06_03"?: number | null
          "2024_06_10"?: number | null
          "2024_06_17"?: number | null
          "2024_06_24"?: number | null
          "2024_07_01"?: number | null
          "2024_07_08"?: number | null
          "2024_07_15"?: number | null
          "2024_07_22"?: number | null
          "2024_07_29"?: number | null
          "2024_08_05"?: number | null
          "2024_08_12"?: number | null
          "2024_08_19"?: number | null
          "2024_08_26"?: number | null
          "2024_09_02"?: number | null
          "2024_09_09"?: number | null
          "2024_09_16"?: number | null
          "2024_09_23"?: number | null
          "2024_09_30"?: number | null
          "2024_10_07"?: number | null
          "2024_10_14"?: number | null
          "2024_10_21"?: number | null
          "2024_10_28"?: number | null
          "2024_11_04"?: number | null
          "2024_11_11"?: number | null
          "2024_11_18"?: number | null
          "2024_11_25"?: number | null
          "2024_12_02"?: number | null
          "2024_12_09"?: number | null
          "2024_12_16"?: number | null
          "2024_12_23"?: number | null
          "2024_12_30"?: number | null
          "2025_01_06"?: number | null
          "2025_01_13"?: number | null
          "2025_01_20"?: number | null
          "2025_01_27"?: number | null
          "2025_02_03"?: number | null
          "2025_02_10"?: number | null
          "2025_02_17"?: number | null
          "2025_02_24"?: number | null
          "2025_03_03"?: number | null
          "2025_03_10"?: number | null
          access?: string | null
          agency_buyer?: string | null
          buyer?: string | null
          buyer_email?: string | null
          client?: string | null
          contact?: string | null
          cost?: number | null
          days?: string | null
          dpt?: string | null
          email?: string | null
          estimate?: string | null
          file_name?: string
          id?: number | null
          len?: string | null
          market?: string | null
          media?: string | null
          office?: string | null
          other_comments?: string | null
          phone?: string | null
          product?: string | null
          programming?: string | null
          row_cost?: number | null
          row_date?: string | null
          row_page?: string | null
          row_table?: Json | null
          station?: string | null
          station_phone?: string | null
          times?: string | null
          tot?: number | null
        }
        Relationships: []
      }
      manual_order_test_table: {
        Row: {
          acc_cfm: string | null
          advertiser_code: string | null
          affiliation: string | null
          agency_codes: string | null
          agency_office_code: string | null
          agency_order_number: string | null
          auto_ec: string | null
          auto_tr: string | null
          books: string | null
          budget: number | null
          budget_note: string | null
          buycode: string | null
          buyer: string | null
          cpe_client: string | null
          cpe_estimate: string | null
          cpe_product: string | null
          cpe_product_2: string | null
          cpm: string | null
          cpp: string | null
          dare_routing_code: string | null
          day_time: string | null
          daypart: string | null
          dayparts: string | null
          demo: string | null
          demo_value: number | null
          direct_response: string | null
          end: string | null
          end_date: string | null
          eorder_number: string | null
          former_rep_headline: string | null
          headline: string | null
          market: string | null
          paid_programming: string | null
          product: string | null
          program: string | null
          rate: number | null
          rate_confirm: string | null
          rating_service: string | null
          salesperson_code: string | null
          seconds: number | null
          seller_office_code: string | null
          spot_length: number | null
          sta_percent: number | null
          start: string | null
          start_date: string | null
          station: string | null
          station_traffic_number: string | null
          svc: string | null
          total_dollars: number | null
          total_impressions: number | null
          total_ratings: string | null
          total_spots: number | null
          trade: string | null
          type: string | null
          weekly_dollars: Json | null
          weekly_impressions: Json | null
          weekly_spots: Json | null
        }
        Insert: {
          acc_cfm?: string | null
          advertiser_code?: string | null
          affiliation?: string | null
          agency_codes?: string | null
          agency_office_code?: string | null
          agency_order_number?: string | null
          auto_ec?: string | null
          auto_tr?: string | null
          books?: string | null
          budget?: number | null
          budget_note?: string | null
          buycode?: string | null
          buyer?: string | null
          cpe_client?: string | null
          cpe_estimate?: string | null
          cpe_product?: string | null
          cpe_product_2?: string | null
          cpm?: string | null
          cpp?: string | null
          dare_routing_code?: string | null
          day_time?: string | null
          daypart?: string | null
          dayparts?: string | null
          demo?: string | null
          demo_value?: number | null
          direct_response?: string | null
          end?: string | null
          end_date?: string | null
          eorder_number?: string | null
          former_rep_headline?: string | null
          headline?: string | null
          market?: string | null
          paid_programming?: string | null
          product?: string | null
          program?: string | null
          rate?: number | null
          rate_confirm?: string | null
          rating_service?: string | null
          salesperson_code?: string | null
          seconds?: number | null
          seller_office_code?: string | null
          spot_length?: number | null
          sta_percent?: number | null
          start?: string | null
          start_date?: string | null
          station?: string | null
          station_traffic_number?: string | null
          svc?: string | null
          total_dollars?: number | null
          total_impressions?: number | null
          total_ratings?: string | null
          total_spots?: number | null
          trade?: string | null
          type?: string | null
          weekly_dollars?: Json | null
          weekly_impressions?: Json | null
          weekly_spots?: Json | null
        }
        Update: {
          acc_cfm?: string | null
          advertiser_code?: string | null
          affiliation?: string | null
          agency_codes?: string | null
          agency_office_code?: string | null
          agency_order_number?: string | null
          auto_ec?: string | null
          auto_tr?: string | null
          books?: string | null
          budget?: number | null
          budget_note?: string | null
          buycode?: string | null
          buyer?: string | null
          cpe_client?: string | null
          cpe_estimate?: string | null
          cpe_product?: string | null
          cpe_product_2?: string | null
          cpm?: string | null
          cpp?: string | null
          dare_routing_code?: string | null
          day_time?: string | null
          daypart?: string | null
          dayparts?: string | null
          demo?: string | null
          demo_value?: number | null
          direct_response?: string | null
          end?: string | null
          end_date?: string | null
          eorder_number?: string | null
          former_rep_headline?: string | null
          headline?: string | null
          market?: string | null
          paid_programming?: string | null
          product?: string | null
          program?: string | null
          rate?: number | null
          rate_confirm?: string | null
          rating_service?: string | null
          salesperson_code?: string | null
          seconds?: number | null
          seller_office_code?: string | null
          spot_length?: number | null
          sta_percent?: number | null
          start?: string | null
          start_date?: string | null
          station?: string | null
          station_traffic_number?: string | null
          svc?: string | null
          total_dollars?: number | null
          total_impressions?: number | null
          total_ratings?: string | null
          total_spots?: number | null
          trade?: string | null
          type?: string | null
          weekly_dollars?: Json | null
          weekly_impressions?: Json | null
          weekly_spots?: Json | null
        }
        Relationships: []
      }
      "media_schedule-table-for-testing": {
        Row: {
          access_code: string | null
          access_name: string | null
          buyer_email: string | null
          buyer_name: string | null
          client_code: string | null
          client_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          cost: string | null
          cost_type: string | null
          created_at: string | null
          date_of_media_schedule: string | null
          days: string | null
          dpt: string | null
          estimate_code: string | null
          flight_schedule: string | null
          id: number
          len: string | null
          market: string | null
          media_code: string | null
          media_name: string | null
          office_code: string | null
          office_name: string | null
          page: string | null
          product_code: string | null
          product_name: string | null
          programming: string | null
          source_file: string | null
          station_code: string | null
          station_name: string | null
          times: string | null
          tot: string | null
          total: string | null
          updated_at: string | null
          weekly_breakdown: string[] | null
        }
        Insert: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Update: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Relationships: []
      }
      "media_schedule-table-for-testing_30samples": {
        Row: {
          access_code: string | null
          access_name: string | null
          buyer_email: string | null
          buyer_name: string | null
          client_code: string | null
          client_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          cost: string | null
          cost_type: string | null
          created_at: string | null
          date_of_media_schedule: string | null
          days: string | null
          dpt: string | null
          estimate_code: string | null
          flight_schedule: string | null
          id: number
          len: string | null
          market: string | null
          media_code: string | null
          media_name: string | null
          office_code: string | null
          office_name: string | null
          page: string | null
          product_code: string | null
          product_name: string | null
          programming: string | null
          source_file: string | null
          station_code: string | null
          station_name: string | null
          times: string | null
          tot: string | null
          total: string | null
          updated_at: string | null
          weekly_breakdown: string[] | null
        }
        Insert: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Update: {
          access_code?: string | null
          access_name?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          client_code?: string | null
          client_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: string | null
          cost_type?: string | null
          created_at?: string | null
          date_of_media_schedule?: string | null
          days?: string | null
          dpt?: string | null
          estimate_code?: string | null
          flight_schedule?: string | null
          id?: number
          len?: string | null
          market?: string | null
          media_code?: string | null
          media_name?: string | null
          office_code?: string | null
          office_name?: string | null
          page?: string | null
          product_code?: string | null
          product_name?: string | null
          programming?: string | null
          source_file?: string | null
          station_code?: string | null
          station_name?: string | null
          times?: string | null
          tot?: string | null
          total?: string | null
          updated_at?: string | null
          weekly_breakdown?: string[] | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          comments: string | null
          conversation_id: string | null
          created_at: string | null
          document_uuid: number | null
          id: number
          message_id: string | null
          overall_rating: number | null
          rater_id: string | null
          rating_type: string
          updated_at: string | null
        }
        Insert: {
          comments?: string | null
          conversation_id?: string | null
          created_at?: string | null
          document_uuid?: number | null
          id?: number
          message_id?: string | null
          overall_rating?: number | null
          rater_id?: string | null
          rating_type: string
          updated_at?: string | null
        }
        Update: {
          comments?: string | null
          conversation_id?: string | null
          created_at?: string | null
          document_uuid?: number | null
          id?: number
          message_id?: string | null
          overall_rating?: number | null
          rater_id?: string | null
          rating_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      references_advertisers: {
        Row: {
          "Agency Code": string | null
          "Candidate First Name": string | null
          "Candidate Last Name": string | null
          "Candidate Party": string | null
          "Candidate Race": string | null
          "Candidate State": string
          "Category Code": string | null
          "Category Name": string | null
          "CMMT 1": string | null
          "CMMT 2": string | null
          "CMMT 3": string | null
          "CMMT 4": string | null
          Code: string
          "Credit Check Pending": boolean | null
          "Enforce Prod": string | null
          "Eorder Buys Unlocked": string | null
          "Issue Description": string | null
          Name: string | null
          Notes: string | null
          "Superset Codes": string | null
          "Updated by Name": string | null
        }
        Insert: {
          "Agency Code"?: string | null
          "Candidate First Name"?: string | null
          "Candidate Last Name"?: string | null
          "Candidate Party"?: string | null
          "Candidate Race"?: string | null
          "Candidate State": string
          "Category Code"?: string | null
          "Category Name"?: string | null
          "CMMT 1"?: string | null
          "CMMT 2"?: string | null
          "CMMT 3"?: string | null
          "CMMT 4"?: string | null
          Code: string
          "Credit Check Pending"?: boolean | null
          "Enforce Prod"?: string | null
          "Eorder Buys Unlocked"?: string | null
          "Issue Description"?: string | null
          Name?: string | null
          Notes?: string | null
          "Superset Codes"?: string | null
          "Updated by Name"?: string | null
        }
        Update: {
          "Agency Code"?: string | null
          "Candidate First Name"?: string | null
          "Candidate Last Name"?: string | null
          "Candidate Party"?: string | null
          "Candidate Race"?: string | null
          "Candidate State"?: string
          "Category Code"?: string | null
          "Category Name"?: string | null
          "CMMT 1"?: string | null
          "CMMT 2"?: string | null
          "CMMT 3"?: string | null
          "CMMT 4"?: string | null
          Code?: string
          "Credit Check Pending"?: boolean | null
          "Enforce Prod"?: string | null
          "Eorder Buys Unlocked"?: string | null
          "Issue Description"?: string | null
          Name?: string | null
          Notes?: string | null
          "Superset Codes"?: string | null
          "Updated by Name"?: string | null
        }
        Relationships: []
      }
      references_agencies: {
        Row: {
          Address: string | null
          "Address 2": string | null
          City: string | null
          "CMMT 1": string | null
          "CMMT 2": string | null
          "CMMT 3": string | null
          "CMMT 4": string | null
          Code: string
          "Holding Company": string | null
          Name: string | null
          Notes: string | null
          Office: string | null
          Phone: string | null
          State: string | null
          Zip: string | null
        }
        Insert: {
          Address?: string | null
          "Address 2"?: string | null
          City?: string | null
          "CMMT 1"?: string | null
          "CMMT 2"?: string | null
          "CMMT 3"?: string | null
          "CMMT 4"?: string | null
          Code: string
          "Holding Company"?: string | null
          Name?: string | null
          Notes?: string | null
          Office?: string | null
          Phone?: string | null
          State?: string | null
          Zip?: string | null
        }
        Update: {
          Address?: string | null
          "Address 2"?: string | null
          City?: string | null
          "CMMT 1"?: string | null
          "CMMT 2"?: string | null
          "CMMT 3"?: string | null
          "CMMT 4"?: string | null
          Code?: string
          "Holding Company"?: string | null
          Name?: string | null
          Notes?: string | null
          Office?: string | null
          Phone?: string | null
          State?: string | null
          Zip?: string | null
        }
        Relationships: []
      }
      references_buy_codes: {
        Row: {
          Code: string
          Name: string | null
          Notes: string | null
          "Short Name": string | null
          "Updated by Name": string | null
        }
        Insert: {
          Code: string
          Name?: string | null
          Notes?: string | null
          "Short Name"?: string | null
          "Updated by Name"?: string | null
        }
        Update: {
          Code?: string
          Name?: string | null
          Notes?: string | null
          "Short Name"?: string | null
          "Updated by Name"?: string | null
        }
        Relationships: []
      }
      references_demographics: {
        Row: {
          "Age From": number | null
          "Age To": number | null
          Category: string | null
          "Char Code 6": string | null
          "Char Code 8": string | null
          "CMPG LINE1": string | null
          "CMPG LINE2": string | null
          "CMPG LINE3": string | null
          Code: string
          "Column Format LINE1": string | null
          "Column Format LINE2": string | null
          "Column Format LINE3": string | null
          "Comscore Code": string | null
          "Comscore Num": number | null
          "DARE Name": string | null
          "DARE Num": string | null
          "Demo Calculation": string | null
          "Demo Category": string | null
          "Demo Field": string | null
          "EPort Category": string | null
          "Format LINE1": string | null
          "Format LINE2": string | null
          "Group Name": string | null
          "Level LINE1": string | null
          "Level LINE2": string | null
          Name: string | null
          Notes: string | null
          "NSI Day Name": string | null
          "NSI Mon Name": string | null
          Num: number
          "Share LINE1": string | null
          "Share LINE2": string | null
          "Short Name": string | null
          Type: string | null
          "Updated by Name": string | null
        }
        Insert: {
          "Age From"?: number | null
          "Age To"?: number | null
          Category?: string | null
          "Char Code 6"?: string | null
          "Char Code 8"?: string | null
          "CMPG LINE1"?: string | null
          "CMPG LINE2"?: string | null
          "CMPG LINE3"?: string | null
          Code: string
          "Column Format LINE1"?: string | null
          "Column Format LINE2"?: string | null
          "Column Format LINE3"?: string | null
          "Comscore Code"?: string | null
          "Comscore Num"?: number | null
          "DARE Name"?: string | null
          "DARE Num"?: string | null
          "Demo Calculation"?: string | null
          "Demo Category"?: string | null
          "Demo Field"?: string | null
          "EPort Category"?: string | null
          "Format LINE1"?: string | null
          "Format LINE2"?: string | null
          "Group Name"?: string | null
          "Level LINE1"?: string | null
          "Level LINE2"?: string | null
          Name?: string | null
          Notes?: string | null
          "NSI Day Name"?: string | null
          "NSI Mon Name"?: string | null
          Num: number
          "Share LINE1"?: string | null
          "Share LINE2"?: string | null
          "Short Name"?: string | null
          Type?: string | null
          "Updated by Name"?: string | null
        }
        Update: {
          "Age From"?: number | null
          "Age To"?: number | null
          Category?: string | null
          "Char Code 6"?: string | null
          "Char Code 8"?: string | null
          "CMPG LINE1"?: string | null
          "CMPG LINE2"?: string | null
          "CMPG LINE3"?: string | null
          Code?: string
          "Column Format LINE1"?: string | null
          "Column Format LINE2"?: string | null
          "Column Format LINE3"?: string | null
          "Comscore Code"?: string | null
          "Comscore Num"?: number | null
          "DARE Name"?: string | null
          "DARE Num"?: string | null
          "Demo Calculation"?: string | null
          "Demo Category"?: string | null
          "Demo Field"?: string | null
          "EPort Category"?: string | null
          "Format LINE1"?: string | null
          "Format LINE2"?: string | null
          "Group Name"?: string | null
          "Level LINE1"?: string | null
          "Level LINE2"?: string | null
          Name?: string | null
          Notes?: string | null
          "NSI Day Name"?: string | null
          "NSI Mon Name"?: string | null
          Num?: number
          "Share LINE1"?: string | null
          "Share LINE2"?: string | null
          "Short Name"?: string | null
          Type?: string | null
          "Updated by Name"?: string | null
        }
        Relationships: []
      }
      references_markets: {
        Row: {
          "Alt Name": string | null
          Code: number
          "Comscore Code": string | null
          "DMA Persons": number | null
          "DMA Rank": number | null
          Name: string | null
          Notes: string | null
          "NSI Survey Type": string | null
          "Percent HH": number | null
          "Primary State": string | null
          "Prime Offset": number | null
          "Secondary State": string | null
          "Tertiary State": string | null
          "Time Zone": string | null
          "TVB Region Number": string | null
          TVHH: number | null
          "Updated by Name": string | null
        }
        Insert: {
          "Alt Name"?: string | null
          Code: number
          "Comscore Code"?: string | null
          "DMA Persons"?: number | null
          "DMA Rank"?: number | null
          Name?: string | null
          Notes?: string | null
          "NSI Survey Type"?: string | null
          "Percent HH"?: number | null
          "Primary State"?: string | null
          "Prime Offset"?: number | null
          "Secondary State"?: string | null
          "Tertiary State"?: string | null
          "Time Zone"?: string | null
          "TVB Region Number"?: string | null
          TVHH?: number | null
          "Updated by Name"?: string | null
        }
        Update: {
          "Alt Name"?: string | null
          Code?: number
          "Comscore Code"?: string | null
          "DMA Persons"?: number | null
          "DMA Rank"?: number | null
          Name?: string | null
          Notes?: string | null
          "NSI Survey Type"?: string | null
          "Percent HH"?: number | null
          "Primary State"?: string | null
          "Prime Offset"?: number | null
          "Secondary State"?: string | null
          "Tertiary State"?: string | null
          "Time Zone"?: string | null
          "TVB Region Number"?: string | null
          TVHH?: number | null
          "Updated by Name"?: string | null
        }
        Relationships: []
      }
      references_offices: {
        Row: {
          Address: string | null
          "Address 2": string | null
          "AE Goal New Headline": number | null
          "AE Goal Progress Notes": number | null
          "AE Goal Transmit": number | null
          City: string | null
          Code: string
          "Contract Printer": number | null
          Country: string | null
          DARE: boolean | null
          EC2WAY: boolean | null
          Email: string | null
          "Erp ID": string | null
          Fax: string | null
          Name: string | null
          Notes: string | null
          Phone: string | null
          "Planner Form": string | null
          "Planner Printer": number | null
          "Primary Contact": string | null
          "R135 Report": boolean | null
          "R143 Report": boolean | null
          "Region Code": string | null
          Regis: boolean | null
          State: string | null
          Supersets: boolean | null
          "Updated by Name": string | null
          "Worksheet Form": string | null
          "Worksheet Form 2": string | null
          "Worksheet Printer": number | null
          "Worksheet Printer 2": number | null
          Zip: string | null
        }
        Insert: {
          Address?: string | null
          "Address 2"?: string | null
          "AE Goal New Headline"?: number | null
          "AE Goal Progress Notes"?: number | null
          "AE Goal Transmit"?: number | null
          City?: string | null
          Code: string
          "Contract Printer"?: number | null
          Country?: string | null
          DARE?: boolean | null
          EC2WAY?: boolean | null
          Email?: string | null
          "Erp ID"?: string | null
          Fax?: string | null
          Name?: string | null
          Notes?: string | null
          Phone?: string | null
          "Planner Form"?: string | null
          "Planner Printer"?: number | null
          "Primary Contact"?: string | null
          "R135 Report"?: boolean | null
          "R143 Report"?: boolean | null
          "Region Code"?: string | null
          Regis?: boolean | null
          State?: string | null
          Supersets?: boolean | null
          "Updated by Name"?: string | null
          "Worksheet Form"?: string | null
          "Worksheet Form 2"?: string | null
          "Worksheet Printer"?: number | null
          "Worksheet Printer 2"?: number | null
          Zip?: string | null
        }
        Update: {
          Address?: string | null
          "Address 2"?: string | null
          "AE Goal New Headline"?: number | null
          "AE Goal Progress Notes"?: number | null
          "AE Goal Transmit"?: number | null
          City?: string | null
          Code?: string
          "Contract Printer"?: number | null
          Country?: string | null
          DARE?: boolean | null
          EC2WAY?: boolean | null
          Email?: string | null
          "Erp ID"?: string | null
          Fax?: string | null
          Name?: string | null
          Notes?: string | null
          Phone?: string | null
          "Planner Form"?: string | null
          "Planner Printer"?: number | null
          "Primary Contact"?: string | null
          "R135 Report"?: boolean | null
          "R143 Report"?: boolean | null
          "Region Code"?: string | null
          Regis?: boolean | null
          State?: string | null
          Supersets?: boolean | null
          "Updated by Name"?: string | null
          "Worksheet Form"?: string | null
          "Worksheet Form 2"?: string | null
          "Worksheet Printer"?: number | null
          "Worksheet Printer 2"?: number | null
          Zip?: string | null
        }
        Relationships: []
      }
      references_operators: {
        Row: {
          "Allow Edit": string | null
          "CSP Supervisor": string | null
          Email: string | null
          "Medialine Secyid": string | null
          Name: string
          "Notification Delegate": string | null
          "Office Location": string | null
          Phone: string | null
          Rep: string | null
          Role: string | null
          "Routing MG Delegate": string | null
          "Routing Uc Delegate": string | null
          Username: string | null
        }
        Insert: {
          "Allow Edit"?: string | null
          "CSP Supervisor"?: string | null
          Email?: string | null
          "Medialine Secyid"?: string | null
          Name: string
          "Notification Delegate"?: string | null
          "Office Location"?: string | null
          Phone?: string | null
          Rep?: string | null
          Role?: string | null
          "Routing MG Delegate"?: string | null
          "Routing Uc Delegate"?: string | null
          Username?: string | null
        }
        Update: {
          "Allow Edit"?: string | null
          "CSP Supervisor"?: string | null
          Email?: string | null
          "Medialine Secyid"?: string | null
          Name?: string
          "Notification Delegate"?: string | null
          "Office Location"?: string | null
          Phone?: string | null
          Rep?: string | null
          Role?: string | null
          "Routing MG Delegate"?: string | null
          "Routing Uc Delegate"?: string | null
          Username?: string | null
        }
        Relationships: []
      }
      references_spot_lengths: {
        Row: {
          Code: string
          "Mixed Case": boolean | null
          Notes: string | null
          "Time Seconds": number | null
          "Time Text": string | null
          "Updated by Name": string | null
        }
        Insert: {
          Code: string
          "Mixed Case"?: boolean | null
          Notes?: string | null
          "Time Seconds"?: number | null
          "Time Text"?: string | null
          "Updated by Name"?: string | null
        }
        Update: {
          Code?: string
          "Mixed Case"?: boolean | null
          Notes?: string | null
          "Time Seconds"?: number | null
          "Time Text"?: string | null
          "Updated by Name"?: string | null
        }
        Relationships: []
      }
      references_station_owners: {
        Row: {
          Address: string | null
          "Address 2": string | null
          "Auth Domain": string | null
          "Auth Type": string | null
          City: string | null
          Code: string
          Country: string | null
          Email: string | null
          "Erp ID": number | null
          Fax: string | null
          "Logtimes API": number | null
          Name: string | null
          Notes: string | null
          Phone: string | null
          "Primary Contact": string | null
          "Reporting Only": boolean | null
          "Short Name": string | null
          State: string | null
          "Updated by Name": string | null
          Zip: string | null
        }
        Insert: {
          Address?: string | null
          "Address 2"?: string | null
          "Auth Domain"?: string | null
          "Auth Type"?: string | null
          City?: string | null
          Code: string
          Country?: string | null
          Email?: string | null
          "Erp ID"?: number | null
          Fax?: string | null
          "Logtimes API"?: number | null
          Name?: string | null
          Notes?: string | null
          Phone?: string | null
          "Primary Contact"?: string | null
          "Reporting Only"?: boolean | null
          "Short Name"?: string | null
          State?: string | null
          "Updated by Name"?: string | null
          Zip?: string | null
        }
        Update: {
          Address?: string | null
          "Address 2"?: string | null
          "Auth Domain"?: string | null
          "Auth Type"?: string | null
          City?: string | null
          Code?: string
          Country?: string | null
          Email?: string | null
          "Erp ID"?: number | null
          Fax?: string | null
          "Logtimes API"?: number | null
          Name?: string | null
          Notes?: string | null
          Phone?: string | null
          "Primary Contact"?: string | null
          "Reporting Only"?: boolean | null
          "Short Name"?: string | null
          State?: string | null
          "Updated by Name"?: string | null
          Zip?: string | null
        }
        Relationships: []
      }
      references_stations: {
        Row: {
          "Affiliate Code": string | null
          "Affiliate Name": string | null
          "Affiliate Short Name": string | null
          "Can Manage Order": string | null
          "Can Manage Proposal": string | null
          Channel: string | null
          Code: string
          "Date Left": string | null
          "Default Communication": string | null
          "Default Station Output Type": string | null
          "DOS Email": string | null
          "DOS First Name": string | null
          "DOS Last Name": string | null
          "DOS Name": string | null
          "DOS Phone": string | null
          "Erp ID": number | null
          "Finance Supported": boolean | null
          "Group Code": string | null
          "Group Name": string | null
          "GSM Email": string | null
          "GSM First Name": string | null
          "GSM Last Name": string | null
          "GSM Name": string | null
          "GSM Phone": string | null
          "Invoice Last Closed": string | null
          "Invoice Last Reconciled": string | null
          "Is CSR Subscriber": boolean | null
          "Is Finance Supported": boolean | null
          "Is NSI Subscriber": boolean | null
          "Is Primary": boolean | null
          "Is Supported": boolean | null
          "Market Alt Name": string | null
          "Market Code": number | null
          "Market DMA Rank": number | null
          "Market Name": string | null
          "Market Name Override": string | null
          "Market Perc HH": number | null
          "Market TVB Region": string | null
          Media: string | null
          "NSI Survey Type": string | null
          "Ownership Auth Domain": string | null
          "Ownership Auth Type": string | null
          "Ownership Code": string | null
          "Ownership Logtimes API": number | null
          "Ownership Name": string | null
          "Ownership Reporting Only": boolean | null
          "Ownership Short Name": string | null
          "Political 104": boolean | null
          "Primary Code": string
          "Primary State": string | null
          "Rep Firm Code": string | null
          "Rep Firm Name": string | null
          "Rep Firm Short Name": string | null
          "Reporting Owner Code": string | null
          "Reporting Owner Name": string | null
          "Reporting Owner Short Name": string | null
          "Secondary State": string | null
          "Specialist Email": string | null
          "Specialist First Name": string | null
          "Specialist Last Name": string | null
          "Specialist Name": string | null
          "Specialist Phone": string | null
          "Station Superset Codes": number | null
          "Superset Codes": number | null
          "Superset Ids": number | null
          "Superset Names": string | null
          Takeover: boolean | null
          Team: string | null
          "Tertiary State": string | null
          "Traffic Code": number | null
          "Traffic Format": string | null
          "Traffic System": string | null
        }
        Insert: {
          "Affiliate Code"?: string | null
          "Affiliate Name"?: string | null
          "Affiliate Short Name"?: string | null
          "Can Manage Order"?: string | null
          "Can Manage Proposal"?: string | null
          Channel?: string | null
          Code: string
          "Date Left"?: string | null
          "Default Communication"?: string | null
          "Default Station Output Type"?: string | null
          "DOS Email"?: string | null
          "DOS First Name"?: string | null
          "DOS Last Name"?: string | null
          "DOS Name"?: string | null
          "DOS Phone"?: string | null
          "Erp ID"?: number | null
          "Finance Supported"?: boolean | null
          "Group Code"?: string | null
          "Group Name"?: string | null
          "GSM Email"?: string | null
          "GSM First Name"?: string | null
          "GSM Last Name"?: string | null
          "GSM Name"?: string | null
          "GSM Phone"?: string | null
          "Invoice Last Closed"?: string | null
          "Invoice Last Reconciled"?: string | null
          "Is CSR Subscriber"?: boolean | null
          "Is Finance Supported"?: boolean | null
          "Is NSI Subscriber"?: boolean | null
          "Is Primary"?: boolean | null
          "Is Supported"?: boolean | null
          "Market Alt Name"?: string | null
          "Market Code"?: number | null
          "Market DMA Rank"?: number | null
          "Market Name"?: string | null
          "Market Name Override"?: string | null
          "Market Perc HH"?: number | null
          "Market TVB Region"?: string | null
          Media?: string | null
          "NSI Survey Type"?: string | null
          "Ownership Auth Domain"?: string | null
          "Ownership Auth Type"?: string | null
          "Ownership Code"?: string | null
          "Ownership Logtimes API"?: number | null
          "Ownership Name"?: string | null
          "Ownership Reporting Only"?: boolean | null
          "Ownership Short Name"?: string | null
          "Political 104"?: boolean | null
          "Primary Code": string
          "Primary State"?: string | null
          "Rep Firm Code"?: string | null
          "Rep Firm Name"?: string | null
          "Rep Firm Short Name"?: string | null
          "Reporting Owner Code"?: string | null
          "Reporting Owner Name"?: string | null
          "Reporting Owner Short Name"?: string | null
          "Secondary State"?: string | null
          "Specialist Email"?: string | null
          "Specialist First Name"?: string | null
          "Specialist Last Name"?: string | null
          "Specialist Name"?: string | null
          "Specialist Phone"?: string | null
          "Station Superset Codes"?: number | null
          "Superset Codes"?: number | null
          "Superset Ids"?: number | null
          "Superset Names"?: string | null
          Takeover?: boolean | null
          Team?: string | null
          "Tertiary State"?: string | null
          "Traffic Code"?: number | null
          "Traffic Format"?: string | null
          "Traffic System"?: string | null
        }
        Update: {
          "Affiliate Code"?: string | null
          "Affiliate Name"?: string | null
          "Affiliate Short Name"?: string | null
          "Can Manage Order"?: string | null
          "Can Manage Proposal"?: string | null
          Channel?: string | null
          Code?: string
          "Date Left"?: string | null
          "Default Communication"?: string | null
          "Default Station Output Type"?: string | null
          "DOS Email"?: string | null
          "DOS First Name"?: string | null
          "DOS Last Name"?: string | null
          "DOS Name"?: string | null
          "DOS Phone"?: string | null
          "Erp ID"?: number | null
          "Finance Supported"?: boolean | null
          "Group Code"?: string | null
          "Group Name"?: string | null
          "GSM Email"?: string | null
          "GSM First Name"?: string | null
          "GSM Last Name"?: string | null
          "GSM Name"?: string | null
          "GSM Phone"?: string | null
          "Invoice Last Closed"?: string | null
          "Invoice Last Reconciled"?: string | null
          "Is CSR Subscriber"?: boolean | null
          "Is Finance Supported"?: boolean | null
          "Is NSI Subscriber"?: boolean | null
          "Is Primary"?: boolean | null
          "Is Supported"?: boolean | null
          "Market Alt Name"?: string | null
          "Market Code"?: number | null
          "Market DMA Rank"?: number | null
          "Market Name"?: string | null
          "Market Name Override"?: string | null
          "Market Perc HH"?: number | null
          "Market TVB Region"?: string | null
          Media?: string | null
          "NSI Survey Type"?: string | null
          "Ownership Auth Domain"?: string | null
          "Ownership Auth Type"?: string | null
          "Ownership Code"?: string | null
          "Ownership Logtimes API"?: number | null
          "Ownership Name"?: string | null
          "Ownership Reporting Only"?: boolean | null
          "Ownership Short Name"?: string | null
          "Political 104"?: boolean | null
          "Primary Code"?: string
          "Primary State"?: string | null
          "Rep Firm Code"?: string | null
          "Rep Firm Name"?: string | null
          "Rep Firm Short Name"?: string | null
          "Reporting Owner Code"?: string | null
          "Reporting Owner Name"?: string | null
          "Reporting Owner Short Name"?: string | null
          "Secondary State"?: string | null
          "Specialist Email"?: string | null
          "Specialist First Name"?: string | null
          "Specialist Last Name"?: string | null
          "Specialist Name"?: string | null
          "Specialist Phone"?: string | null
          "Station Superset Codes"?: number | null
          "Superset Codes"?: number | null
          "Superset Ids"?: number | null
          "Superset Names"?: string | null
          Takeover?: boolean | null
          Team?: string | null
          "Tertiary State"?: string | null
          "Traffic Code"?: number | null
          "Traffic Format"?: string | null
          "Traffic System"?: string | null
        }
        Relationships: []
      }
      "sample-new-order-headers": {
        Row: {
          AgencyName: string | null
          Client: string | null
          Cost: string | null
          created_at: string
          Days: string | null
          Dpt: string | null
          Estimate: string | null
          id: number
          Length: string | null
          Market: string | null
          name: string | null
          Product: string | null
          Programming: string | null
          Station: string | null
          Times: string | null
          Total: string | null
        }
        Insert: {
          AgencyName?: string | null
          Client?: string | null
          Cost?: string | null
          created_at?: string
          Days?: string | null
          Dpt?: string | null
          Estimate?: string | null
          id?: number
          Length?: string | null
          Market?: string | null
          name?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Times?: string | null
          Total?: string | null
        }
        Update: {
          AgencyName?: string | null
          Client?: string | null
          Cost?: string | null
          created_at?: string
          Days?: string | null
          Dpt?: string | null
          Estimate?: string | null
          id?: number
          Length?: string | null
          Market?: string | null
          name?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Times?: string | null
          Total?: string | null
        }
        Relationships: []
      }
      "sample-new-order-tables": {
        Row: {
          AgencyName: string | null
          Client: string | null
          Cost: string | null
          created_at: string
          Days: string | null
          Dpt: string | null
          Estimate: string | null
          id: number
          Length: string | null
          Market: string | null
          name: string | null
          Product: string | null
          Programming: string | null
          Station: string | null
          Times: string | null
          Total: string | null
        }
        Insert: {
          AgencyName?: string | null
          Client?: string | null
          Cost?: string | null
          created_at?: string
          Days?: string | null
          Dpt?: string | null
          Estimate?: string | null
          id?: number
          Length?: string | null
          Market?: string | null
          name?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Times?: string | null
          Total?: string | null
        }
        Update: {
          AgencyName?: string | null
          Client?: string | null
          Cost?: string | null
          created_at?: string
          Days?: string | null
          Dpt?: string | null
          Estimate?: string | null
          id?: number
          Length?: string | null
          Market?: string | null
          name?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Times?: string | null
          Total?: string | null
        }
        Relationships: []
      }
      synthetic_data_test: {
        Row: {
          Access: string | null
          Agency_Buyer: string | null
          Buyer: string | null
          client: string | null
          Contact: string | null
          Cost: string | null
          Date: string | null
          Days: string | null
          Dpt: string | null
          Email: string | null
          end_date: string | null
          Estimate: string | null
          flight_schedule: string | null
          id: number | null
          Len: string | null
          Market: string | null
          media: string | null
          Office: string | null
          Other_Comments: string | null
          Page: string | null
          pdf_file: string | null
          Phone: string | null
          Product: string | null
          Programming: string | null
          start_date: string | null
          Station: string | null
          Station_Email: string | null
          Station_Phone: string | null
          Times: string | null
          Tot: string | null
          uuid: string | null
        }
        Insert: {
          Access?: string | null
          Agency_Buyer?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          end_date?: string | null
          Estimate?: string | null
          flight_schedule?: string | null
          id?: number | null
          Len?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: string | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          start_date?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: string | null
          uuid?: string | null
        }
        Update: {
          Access?: string | null
          Agency_Buyer?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          end_date?: string | null
          Estimate?: string | null
          flight_schedule?: string | null
          id?: number | null
          Len?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: string | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          start_date?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: string | null
          uuid?: string | null
        }
        Relationships: []
      }
      synthetic_data_test_2: {
        Row: {
          Access: string | null
          Agency_Buyer: string | null
          agency_name: string | null
          Buyer: string | null
          client: string | null
          Contact: string | null
          Cost: string | null
          Date: string | null
          Days: string | null
          Dpt: string | null
          Email: string | null
          end_date: string | null
          Estimate: string | null
          flight_schedule: string | null
          id: number | null
          Len: string | null
          Market: string | null
          media: string | null
          Office: string | null
          Other_Comments: string | null
          Page: string | null
          pdf_file: string | null
          Phone: string | null
          Product: string | null
          Programming: string | null
          start_date: string | null
          Station: string | null
          Station_Email: string | null
          Station_Phone: string | null
          Times: string | null
          Tot: string | null
          uuid: string | null
        }
        Insert: {
          Access?: string | null
          Agency_Buyer?: string | null
          agency_name?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          end_date?: string | null
          Estimate?: string | null
          flight_schedule?: string | null
          id?: number | null
          Len?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: string | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          start_date?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: string | null
          uuid?: string | null
        }
        Update: {
          Access?: string | null
          Agency_Buyer?: string | null
          agency_name?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          end_date?: string | null
          Estimate?: string | null
          flight_schedule?: string | null
          id?: number | null
          Len?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: string | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          start_date?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: string | null
          uuid?: string | null
        }
        Relationships: []
      }
      synthetic_data_test_3: {
        Row: {
          Access: string | null
          Agency_Buyer: string | null
          agency_name: string | null
          Buyer: string | null
          client: string | null
          Contact: string | null
          Cost: string | null
          Date: string | null
          Days: string | null
          Dpt: string | null
          Email: string | null
          end_date: string | null
          Estimate: string | null
          flight_schedule: string | null
          id: number | null
          Len: string | null
          Market: string | null
          media: string | null
          Office: string | null
          Other_Comments: string | null
          Page: string | null
          pdf_file: string | null
          Phone: string | null
          Product: string | null
          Programming: string | null
          start_date: string | null
          Station: string | null
          Station_Email: string | null
          Station_Phone: string | null
          Times: string | null
          Tot: string | null
          uuid: string | null
        }
        Insert: {
          Access?: string | null
          Agency_Buyer?: string | null
          agency_name?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          end_date?: string | null
          Estimate?: string | null
          flight_schedule?: string | null
          id?: number | null
          Len?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: string | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          start_date?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: string | null
          uuid?: string | null
        }
        Update: {
          Access?: string | null
          Agency_Buyer?: string | null
          agency_name?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          end_date?: string | null
          Estimate?: string | null
          flight_schedule?: string | null
          id?: number | null
          Len?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: string | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          start_date?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: string | null
          uuid?: string | null
        }
        Relationships: []
      }
      synthetic_data_test_4: {
        Row: {
          Access: string | null
          agency_name: string | null
          Buyer: string | null
          client: string | null
          Contact: string | null
          Cost: string | null
          Date: string | null
          Email: string | null
          end_date: string | null
          Estimate: string | null
          Market: string | null
          media: string | null
          Office: string | null
          pdf_file: string | null
          Product: string | null
          start_date: string | null
          Station: string | null
          Station_Email: string | null
        }
        Insert: {
          Access?: string | null
          agency_name?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Email?: string | null
          end_date?: string | null
          Estimate?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          pdf_file?: string | null
          Product?: string | null
          start_date?: string | null
          Station?: string | null
          Station_Email?: string | null
        }
        Update: {
          Access?: string | null
          agency_name?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Email?: string | null
          end_date?: string | null
          Estimate?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          pdf_file?: string | null
          Product?: string | null
          start_date?: string | null
          Station?: string | null
          Station_Email?: string | null
        }
        Relationships: []
      }
      synthetic_data_test_duplicate: {
        Row: {
          Access: string | null
          Agency_Buyer: string | null
          Buyer: string | null
          client: string | null
          Contact: string | null
          Cost: string | null
          Date: string | null
          Days: string | null
          Dpt: string | null
          Email: string | null
          Estimate: string | null
          id: number | null
          Len: string | null
          Market: string | null
          media: string | null
          Office: string | null
          Other_Comments: string | null
          Page: string | null
          pdf_file: string | null
          Phone: string | null
          Product: string | null
          Programming: string | null
          Station: string | null
          Station_Email: string | null
          Station_Phone: string | null
          Times: string | null
          Tot: string | null
          uuid: string | null
        }
        Insert: {
          Access?: string | null
          Agency_Buyer?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          Estimate?: string | null
          id?: number | null
          Len?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: string | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: string | null
          uuid?: string | null
        }
        Update: {
          Access?: string | null
          Agency_Buyer?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          Estimate?: string | null
          id?: number | null
          Len?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: string | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: string | null
          uuid?: string | null
        }
        Relationships: []
      }
      synthetic_data_test_duplicate_duplicate: {
        Row: {
          Access: string | null
          Agency_Buyer: string | null
          Buyer: string | null
          client: string | null
          Contact: string | null
          Cost: string | null
          Date: string | null
          Days: string | null
          Dpt: string | null
          Email: string | null
          Estimate: string | null
          id: number | null
          Len: string | null
          Market: string | null
          media: string | null
          Office: string | null
          Other_Comments: string | null
          Page: string | null
          pdf_file: string | null
          Phone: string | null
          Product: string | null
          Programming: string | null
          Station: string | null
          Station_Email: string | null
          Station_Phone: string | null
          Times: string | null
          Tot: string | null
          uuid: string | null
        }
        Insert: {
          Access?: string | null
          Agency_Buyer?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          Estimate?: string | null
          id?: number | null
          Len?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: string | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: string | null
          uuid?: string | null
        }
        Update: {
          Access?: string | null
          Agency_Buyer?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          Estimate?: string | null
          id?: number | null
          Len?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: string | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: string | null
          uuid?: string | null
        }
        Relationships: []
      }
      synthetic_data_test_duplicate_duplicate_duplicate: {
        Row: {
          Access: string | null
          Agency_Buyer: string | null
          Buyer: string | null
          client: string | null
          Contact: string | null
          Cost: string | null
          Date: string | null
          Days: string | null
          Dpt: string | null
          Email: string | null
          Estimate: string | null
          id: number | null
          Len: string | null
          Market: string | null
          media: string | null
          Office: string | null
          Other_Comments: string | null
          Page: string | null
          pdf_file: string | null
          Phone: string | null
          Product: string | null
          Programming: string | null
          Station: string | null
          Station_Email: string | null
          Station_Phone: string | null
          Times: string | null
          Tot: string | null
          uuid: string | null
        }
        Insert: {
          Access?: string | null
          Agency_Buyer?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          Estimate?: string | null
          id?: number | null
          Len?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: string | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: string | null
          uuid?: string | null
        }
        Update: {
          Access?: string | null
          Agency_Buyer?: string | null
          Buyer?: string | null
          client?: string | null
          Contact?: string | null
          Cost?: string | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          Estimate?: string | null
          id?: number | null
          Len?: string | null
          Market?: string | null
          media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: string | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: string | null
          uuid?: string | null
        }
        Relationships: []
      }
      "synthetic-data-buy-lines": {
        Row: {
          created_at: string
          days: string | null
          id: number
          pdf_file: string | null
          programming: string | null
          times: string | null
        }
        Insert: {
          created_at?: string
          days?: string | null
          id?: number
          pdf_file?: string | null
          programming?: string | null
          times?: string | null
        }
        Update: {
          created_at?: string
          days?: string | null
          id?: number
          pdf_file?: string | null
          programming?: string | null
          times?: string | null
        }
        Relationships: []
      }
      table_compare: {
        Row: {
          "10/14/2024": number | null
          "10/21/2024": number | null
          "10/28/2024": number | null
          "10/7/2024": number | null
          "8/12/2024": number | null
          "8/19/2024": number | null
          "8/26/2024": string | null
          "9/16/2024": number | null
          "9/2/2024": number | null
          "9/23/2024": number | null
          "9/30/2024": number | null
          "9/9/2024": number | null
          Access: string | null
          Agency_Buyer: string | null
          Buyer: string | null
          Client: string | null
          Contact: string | null
          Cost: number | null
          Date: string | null
          Days: string | null
          Dpt: string | null
          Email: string | null
          Estimate: string | null
          Len: string | null
          Market: string | null
          Media: string | null
          Office: string | null
          Other_Comments: string | null
          Page: number | null
          pdf_file: string | null
          Phone: string | null
          Product: string | null
          Programming: string | null
          Station: string | null
          Station_Email: string | null
          Station_Phone: string | null
          Times: string | null
          Tot: number | null
        }
        Insert: {
          "10/14/2024"?: number | null
          "10/21/2024"?: number | null
          "10/28/2024"?: number | null
          "10/7/2024"?: number | null
          "8/12/2024"?: number | null
          "8/19/2024"?: number | null
          "8/26/2024"?: string | null
          "9/16/2024"?: number | null
          "9/2/2024"?: number | null
          "9/23/2024"?: number | null
          "9/30/2024"?: number | null
          "9/9/2024"?: number | null
          Access?: string | null
          Agency_Buyer?: string | null
          Buyer?: string | null
          Client?: string | null
          Contact?: string | null
          Cost?: number | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          Estimate?: string | null
          Len?: string | null
          Market?: string | null
          Media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: number | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: number | null
        }
        Update: {
          "10/14/2024"?: number | null
          "10/21/2024"?: number | null
          "10/28/2024"?: number | null
          "10/7/2024"?: number | null
          "8/12/2024"?: number | null
          "8/19/2024"?: number | null
          "8/26/2024"?: string | null
          "9/16/2024"?: number | null
          "9/2/2024"?: number | null
          "9/23/2024"?: number | null
          "9/30/2024"?: number | null
          "9/9/2024"?: number | null
          Access?: string | null
          Agency_Buyer?: string | null
          Buyer?: string | null
          Client?: string | null
          Contact?: string | null
          Cost?: number | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          Estimate?: string | null
          Len?: string | null
          Market?: string | null
          Media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: number | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: number | null
        }
        Relationships: []
      }
      table_compare_duplicate: {
        Row: {
          "10/14/2024": number | null
          "10/21/2024": number | null
          "10/28/2024": number | null
          "10/7/2024": number | null
          "8/12/2024": number | null
          "8/19/2024": number | null
          "8/26/2024": string | null
          "9/16/2024": number | null
          "9/2/2024": number | null
          "9/23/2024": number | null
          "9/30/2024": number | null
          "9/9/2024": number | null
          Access: string | null
          Agency_Buyer: string | null
          Buyer: string | null
          Client: string | null
          Contact: string | null
          Cost: number | null
          Date: string | null
          Days: string | null
          Dpt: string | null
          Email: string | null
          Estimate: string | null
          Len: string | null
          Market: string | null
          Media: string | null
          Office: string | null
          Other_Comments: string | null
          Page: number | null
          pdf_file: string | null
          Phone: string | null
          Product: string | null
          Programming: string | null
          Station: string | null
          Station_Email: string | null
          Station_Phone: string | null
          Times: string | null
          Tot: number | null
        }
        Insert: {
          "10/14/2024"?: number | null
          "10/21/2024"?: number | null
          "10/28/2024"?: number | null
          "10/7/2024"?: number | null
          "8/12/2024"?: number | null
          "8/19/2024"?: number | null
          "8/26/2024"?: string | null
          "9/16/2024"?: number | null
          "9/2/2024"?: number | null
          "9/23/2024"?: number | null
          "9/30/2024"?: number | null
          "9/9/2024"?: number | null
          Access?: string | null
          Agency_Buyer?: string | null
          Buyer?: string | null
          Client?: string | null
          Contact?: string | null
          Cost?: number | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          Estimate?: string | null
          Len?: string | null
          Market?: string | null
          Media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: number | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: number | null
        }
        Update: {
          "10/14/2024"?: number | null
          "10/21/2024"?: number | null
          "10/28/2024"?: number | null
          "10/7/2024"?: number | null
          "8/12/2024"?: number | null
          "8/19/2024"?: number | null
          "8/26/2024"?: string | null
          "9/16/2024"?: number | null
          "9/2/2024"?: number | null
          "9/23/2024"?: number | null
          "9/30/2024"?: number | null
          "9/9/2024"?: number | null
          Access?: string | null
          Agency_Buyer?: string | null
          Buyer?: string | null
          Client?: string | null
          Contact?: string | null
          Cost?: number | null
          Date?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          Estimate?: string | null
          Len?: string | null
          Market?: string | null
          Media?: string | null
          Office?: string | null
          Other_Comments?: string | null
          Page?: number | null
          pdf_file?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Station_Email?: string | null
          Station_Phone?: string | null
          Times?: string | null
          Tot?: number | null
        }
        Relationships: []
      }
      test_data_combined: {
        Row: {
          Access: string | null
          Client: string | null
          Contact: string | null
          Cost: string | null
          Days: string[] | null
          Dpt: string[] | null
          Email: string | null
          Estimate: string | null
          "File Name": string | null
          "Flight Dates": string | null
          id: number
          Len: string[] | null
          Market: string | null
          Media: string | null
          Office: string | null
          Product: string | null
          Programming: string[] | null
          Station: string | null
          Times: string[] | null
          Total: string[] | null
        }
        Insert: {
          Access?: string | null
          Client?: string | null
          Contact?: string | null
          Cost?: string | null
          Days?: string[] | null
          Dpt?: string[] | null
          Email?: string | null
          Estimate?: string | null
          "File Name"?: string | null
          "Flight Dates"?: string | null
          id?: number
          Len?: string[] | null
          Market?: string | null
          Media?: string | null
          Office?: string | null
          Product?: string | null
          Programming?: string[] | null
          Station?: string | null
          Times?: string[] | null
          Total?: string[] | null
        }
        Update: {
          Access?: string | null
          Client?: string | null
          Contact?: string | null
          Cost?: string | null
          Days?: string[] | null
          Dpt?: string[] | null
          Email?: string | null
          Estimate?: string | null
          "File Name"?: string | null
          "Flight Dates"?: string | null
          id?: number
          Len?: string[] | null
          Market?: string | null
          Media?: string | null
          Office?: string | null
          Product?: string | null
          Programming?: string[] | null
          Station?: string | null
          Times?: string[] | null
          Total?: string[] | null
        }
        Relationships: []
      }
      test_data_combined_2: {
        Row: {
          Access: string | null
          Buyer: string | null
          Client: string | null
          Contact: string | null
          Cost: string | null
          Days: string | null
          Dpt: string | null
          Email: string | null
          Estimate: string | null
          "File Name": string | null
          "Flight Dates": string | null
          FlightDatesBreakdown: string[] | null
          id: number
          Len: string | null
          Market: string | null
          Media: string | null
          Office: string | null
          Phone: string | null
          Product: string | null
          Programming: string | null
          Station: string | null
          Times: string | null
          Total: string | null
          weeklyBreakdown: string[] | null
        }
        Insert: {
          Access?: string | null
          Buyer?: string | null
          Client?: string | null
          Contact?: string | null
          Cost?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          Estimate?: string | null
          "File Name"?: string | null
          "Flight Dates"?: string | null
          FlightDatesBreakdown?: string[] | null
          id?: number
          Len?: string | null
          Market?: string | null
          Media?: string | null
          Office?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Times?: string | null
          Total?: string | null
          weeklyBreakdown?: string[] | null
        }
        Update: {
          Access?: string | null
          Buyer?: string | null
          Client?: string | null
          Contact?: string | null
          Cost?: string | null
          Days?: string | null
          Dpt?: string | null
          Email?: string | null
          Estimate?: string | null
          "File Name"?: string | null
          "Flight Dates"?: string | null
          FlightDatesBreakdown?: string[] | null
          id?: number
          Len?: string | null
          Market?: string | null
          Media?: string | null
          Office?: string | null
          Phone?: string | null
          Product?: string | null
          Programming?: string | null
          Station?: string | null
          Times?: string | null
          Total?: string | null
          weeklyBreakdown?: string[] | null
        }
        Relationships: []
      }
      test_header_data: {
        Row: {
          Access: string | null
          Buyer: string | null
          Client: string | null
          Contact: string | null
          Email: string | null
          Estimate: string | null
          "Flight Dates": string | null
          id: number
          Market: string | null
          Media: string | null
          name: string | null
          Office: string | null
          Phone: string | null
          Product: string | null
          Station: string | null
        }
        Insert: {
          Access?: string | null
          Buyer?: string | null
          Client?: string | null
          Contact?: string | null
          Email?: string | null
          Estimate?: string | null
          "Flight Dates"?: string | null
          id?: number
          Market?: string | null
          Media?: string | null
          name?: string | null
          Office?: string | null
          Phone?: string | null
          Product?: string | null
          Station?: string | null
        }
        Update: {
          Access?: string | null
          Buyer?: string | null
          Client?: string | null
          Contact?: string | null
          Email?: string | null
          Estimate?: string | null
          "Flight Dates"?: string | null
          id?: number
          Market?: string | null
          Media?: string | null
          name?: string | null
          Office?: string | null
          Phone?: string | null
          Product?: string | null
          Station?: string | null
        }
        Relationships: []
      }
      test_schedule_data: {
        Row: {
          Client: string | null
          Cost: string | null
          Days: string | null
          Dpt: string | null
          "Flight Dates": string[] | null
          id: number
          Length: string | null
          Market: string | null
          Programming: string | null
          Station: string | null
          Times: string | null
          Total: string | null
          "Weekly Breakdown": string[] | null
        }
        Insert: {
          Client?: string | null
          Cost?: string | null
          Days?: string | null
          Dpt?: string | null
          "Flight Dates"?: string[] | null
          id?: number
          Length?: string | null
          Market?: string | null
          Programming?: string | null
          Station?: string | null
          Times?: string | null
          Total?: string | null
          "Weekly Breakdown"?: string[] | null
        }
        Update: {
          Client?: string | null
          Cost?: string | null
          Days?: string | null
          Dpt?: string | null
          "Flight Dates"?: string[] | null
          id?: number
          Length?: string | null
          Market?: string | null
          Programming?: string | null
          Station?: string | null
          Times?: string | null
          Total?: string | null
          "Weekly Breakdown"?: string[] | null
        }
        Relationships: []
      }
      thirty_sample_test: {
        Row: {
          Access: string | null
          Client: string | null
          Contact: string | null
          Cost: string | null
          Days: Json | null
          Dpt: Json | null
          Email: string | null
          Estimate: string | null
          "File Name": string
          "Flight Dates": string | null
          id: number | null
          Len: Json | null
          Market: string | null
          Media: string | null
          Office: string | null
          Product: string | null
          Programming: Json | null
          Station: string | null
          Times: Json | null
          Total: Json | null
        }
        Insert: {
          Access?: string | null
          Client?: string | null
          Contact?: string | null
          Cost?: string | null
          Days?: Json | null
          Dpt?: Json | null
          Email?: string | null
          Estimate?: string | null
          "File Name": string
          "Flight Dates"?: string | null
          id?: number | null
          Len?: Json | null
          Market?: string | null
          Media?: string | null
          Office?: string | null
          Product?: string | null
          Programming?: Json | null
          Station?: string | null
          Times?: Json | null
          Total?: Json | null
        }
        Update: {
          Access?: string | null
          Client?: string | null
          Contact?: string | null
          Cost?: string | null
          Days?: Json | null
          Dpt?: Json | null
          Email?: string | null
          Estimate?: string | null
          "File Name"?: string
          "Flight Dates"?: string | null
          id?: number | null
          Len?: Json | null
          Market?: string | null
          Media?: string | null
          Office?: string | null
          Product?: string | null
          Programming?: Json | null
          Station?: string | null
          Times?: Json | null
          Total?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
