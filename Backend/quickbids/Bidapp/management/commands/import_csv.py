import csv
from django.core.management.base import BaseCommand
from Bidapp.models import Products as MyModel
from datetime import timedelta, datetime


class Command(BaseCommand):
    help = 'Load products and categories from CSV files into the database'

    def handle(self, *args, **kwargs):
        self.import_products()

    def import_products(self):
        with open('Data\products1.csv', newline='' ,encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                    data = [MyModel(ItemID = row['ItemID'],
                    ProductTitle =row['ProductTitle'],
                    ProductDescription = row['ProductDescription'],
                    ProductPrice=row['ProductPrice'],
                    MainImageURL =row['MainImageURL'], 
                    AllImagesURLs =row['AllImagesURLs'], 
                    CategoryID=row['CategoryID'],
                    CategoryName =row['CategoryName'], 
                    MainCategoryName=row['CategoryName'].split(':')[0].strip(),
                    ItemSpecifications =row['ItemSpecifications'], 
                    EndTime = datetime.now() + timedelta(minutes=float(row['ProductPrice'])/100),
                    current_BID= row['ProductPrice'],
                    BidHistory=[],
                    current_BIDDER='null'
                    
                    ) for row in reader]
    
                    MyModel.objects.bulk_create(data)
