class Article < ApplicationRecord
  has_many :credits
  belongs_to :user
  belongs_to :category

  has_many :article_sources
  has_many :sources, through: :article_sources, :dependent => :destroy
  belongs_to :address

  validates :title, :content, :category, :country, presence: true
  before_save :make_title_case


  def self.most_credited_article
    most_credited_by_votes = 0
    most_credited_article=""

    self.all.each do |article|
      # --comparing total count for each article
      total_credits_per_article = article.credits.count
      if total_credits_per_article > most_credited_by_votes
          most_credited_by_votes = total_credits_per_article
          most_credited_article =  Article.find(article.id)
      end
    end

    if most_credited_article!=""
      most_credited_article.title
    else
      " There are currently no articles to credit! "
    end
  end

  # --nested forms custom attribute writter
  def sources_attributes=(sources_attributes)
     sources_attributes.values.each do |sources_attribute|
       if sources_attribute[:name].blank? || sources_attribute[:source_id].blank?

       else
         source = Source.find_or_create_by(sources_attribute)
         self.sources << source
       end
     end
   end

   # --nested forms custom attribute writter
   def address_attributes=(address_attributes)
      address_attributes.values.each do |address_attribute|
        if address_attribute[:city].blank? || address_attribute[:city].blank?

        else
          city = City.find_or_create_by(address_attribute)
          self.address.city << city
        end

        if address_attribute[:country].blank? || address_attribute[:country].blank?

        else
          country = Country.find_or_create_by(address_attribute)
          self.address.country << country
        end

      end
    end

  def total_credits
    vote_count = 0
    self.credits.each do |credit|
      vote_count += credit.vote
    end
    self.save

    #  # --when an article is first created author_id is generated in the credits table as a result a new credit +1 is created
    # # --but we only want a credit created by a reader so we remove the credit auto created by the author's article
    vote_count
  end

  # --callbacks are defined in the object models and called in the controller
  def is_title_case
    if title.split.any?{|w|w[0].upcase != w[0]}
     errors.add(:title, "Title must be in title case")
    end
  end

  def make_title_case
    self.title = self.title.titlecase
  end

end
