class CreditsController < ApplicationController

  def create
    credit = Credit.new(credit_params)
    if credit.save
        redirect_to user_article_path(credit.article_id), notice:"You have successfully voted for this article!"
    else
        redirect_to user_article_path(credit.article_id), notice: "You have already credited this article!"
    end
  end

  private

    def credit_params
      params.require(:credit).permit(
      :vote,
      :article_id,
      :user_id
      )
    end
end
